import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASS,
  database: 'appstore',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

const SEVERITY_LEVELS = {
  CRITICAL: ['500', '503', '504'],
  HIGH: ['400', '401', '403', '404', '429'],
  MEDIUM: ['422', '408', '409'],
  LOW: ['301', '302', '304']
};

class ErrorHandler {
  constructor() {
    this.pool = pool; 
  }

  async logError(errorData) {
    const { errorCode, errorName, errorMessage, location, appId = null, userId = null } = errorData;
    const severity = this.determineSeverity(errorCode);
    const errorId = uuidv4();

    try {
      const connection = await this.pool.getConnection();
      await connection.execute(
        `INSERT INTO error_logs 
        (error_id, error_code, error_name, error_message, location, severity_level, app_id, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [errorId, errorCode, errorName, errorMessage, location, severity, appId, userId]
      );
      connection.release();
      
      if (severity === 'low') {
        await this.markAsHandled(errorId);
      }
      return errorId;
    } catch (err) {
      console.error('Database Error:', err.message);
      throw new Error('Failed to log error');
    }
  }

  determineSeverity(errorCode) {
    if (SEVERITY_LEVELS.CRITICAL.includes(errorCode)) return 'critical';
    if (SEVERITY_LEVELS.HIGH.includes(errorCode)) return 'high';
    if (SEVERITY_LEVELS.MEDIUM.includes(errorCode)) return 'medium';
    return 'low';
  }

  async markAsHandled(errorId) {
    try {
      const connection = await this.pool.getConnection();
      await connection.execute(
        `UPDATE error_logs SET is_handled = TRUE WHERE error_id = ?`,
        [errorId]
      );
      connection.release();
    } catch (err) {
      console.error('Database Error:', err.message);
      throw new Error('Failed to update error status');
    }
  }
}

const app = express();
const errorHandler = new ErrorHandler();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(async (err, req, res, next) => {
  try {
    const errorId = await errorHandler.logError({
      errorCode: err.status || '500',
      errorName: err.name || 'UnhandledException',
      errorMessage: err.message,
      location: req.path
    });
    console.error(`Error ${errorId} logged`);
  } catch (logErr) {
    console.error('Failed to log error:', logErr);
  }
  next(err);
});

cron.schedule('0 * * * *', () => {
  errorHandler.autoHandleErrors().catch(console.error);
});

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, type } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    
    const [result] = await pool.query(
      `INSERT INTO users SET ?`, 
      {
        username,
        email,
        password_hash: hash,
        type,
        full_name: username,
        company_name: type === 'developer' ? 'Individual Developer' : null
      }
    );

    res.status(201).json({ 
      user_id: result.insertId,
      type,
      email
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        type: user.type
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: {
        user_id: user.user_id,
        type: user.type,
        email: user.email,
        company_name: user.company_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


app.get('/categories', async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT category_id, name, description, created_at FROM categories'
    );
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/categories', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    
    res.status(201).json({ 
      message: 'Category created!',
      category_id: result.insertId,
      name,
      description
    });
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.get('/apps', async (req, res) => {
  try {
    const { featured, category } = req.query;
    let query = 'SELECT * FROM apps WHERE status = "approved"';
    const params = [];
    
    if (featured) {
      query += ' AND is_featured = TRUE';
    }
    
    if (category) {
      query += ' AND category_id = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC LIMIT 100';
    
    const [apps] = await pool.query(query, params);
    res.json(apps);
  } catch (error) {
    console.error('Error fetching apps:', error);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

app.put('/admin/apps/:app_id/feature', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const { featured } = req.body;
    await pool.query(
      'UPDATE apps SET is_featured = ? WHERE app_id = ?',
      [featured, req.params.app_id]
    );
    res.json({ message: `App ${featured ? 'featured' : 'unfeatured'} successfully` });
  } catch (error) {
    console.error('Feature update error:', error);
    res.status(500).json({ error: 'Failed to update featured status' });
  }
});

app.get('/validate-token', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.get('/developer/apps', authenticateToken, roleMiddleware('developer'), async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM apps WHERE developer_id = ?',
      [req.user.user_id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Developer apps error:', error);
    res.status(500).json({ error: 'Failed to fetch developer apps' });
  }
});

app.post('/developer/apps', authenticateToken, roleMiddleware('developer'), async (req, res) => {
  const { name, description, icon_url, download_url, category_id } = req.body;
  
  if (!name || !description || !icon_url || !download_url || !category_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO apps 
      (name, description, icon_url, download_url, category_id, developer_id, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [name, description, icon_url, download_url, category_id, req.user.user_id]
    );
    
    res.status(201).json({ message: 'App submitted!', app_id: result.insertId });
  } catch (error) {
    console.error('App submission error:', error);
    res.status(500).json({ error: 'App submission failed' });
  }
});

app.get('/admin/apps', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM apps ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Admin apps error:', error);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});


app.get('/error-stats', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const [severityCounts] = await pool.query(`
      SELECT 
        severity_level,
        COUNT(*) AS count
      FROM error_logs
      GROUP BY severity_level
    `);

    const [trendData] = await pool.query(`
      SELECT 
        DATE(timestamp) AS date,
        SUM(CASE WHEN severity_level = 'critical' THEN 1 ELSE 0 END) AS critical,
        COUNT(*) AS total
      FROM error_logs
      WHERE timestamp > NOW() - INTERVAL 7 DAY
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `);

    const [recentCritical] = await pool.query(`
      SELECT *
      FROM error_logs
      WHERE severity_level = 'critical'
      ORDER BY timestamp DESC
      LIMIT 5
    `);

    const [counts] = await pool.query(`
      SELECT
        SUM(CASE WHEN severity_level = 'critical' THEN 1 ELSE 0 END) AS criticalCount,
        SUM(is_handled = 0) AS unhandledCount
      FROM error_logs
    `);

    res.json({
      severity: {
        critical: severityCounts.find(s => s.severity_level === 'critical')?.count || 0,
        high: severityCounts.find(s => s.severity_level === 'high')?.count || 0,
        medium: severityCounts.find(s => s.severity_level === 'medium')?.count || 0,
        low: severityCounts.find(s => s.severity_level === 'low')?.count || 0
      },
      trends: {
        labels: trendData.map(d => new Date(d.date).toLocaleDateString()),
        critical: trendData.map(d => d.critical),
        all: trendData.map(d => d.total)
      },
      recentCritical: recentCritical.map(e => ({
        error_code: e.error_code,
        error_message: e.error_message,
        location: e.location,
        timestamp: e.timestamp,
        is_handled: Boolean(e.is_handled)
      })),
      ...counts[0]
    });

  } catch (error) {
    console.error('Error stats error:', error);
    res.status(500).json({ error: 'Failed to fetch error statistics' });
  }
});


app.get('/performance-metrics', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const [metrics] = await pool.query(`
      SELECT 
        AVG(avg_load_time) AS avgLoadTime,
        (SUM(page_views) - SUM(CASE WHEN avg_load_time > 2000 THEN page_views ELSE 0 END)) / SUM(page_views) * 100 AS uptime
      FROM website_performance
      WHERE date > NOW() - INTERVAL 30 DAY
    `);

    const [historical] = await pool.query(`
      SELECT 
        date,
        page_views,
        avg_load_time
      FROM website_performance
      ORDER BY date DESC
      LIMIT 30
    `);

    res.json({
      avgLoadTime: metrics[0].avgLoadTime.toFixed(1),
      uptime: metrics[0].uptime.toFixed(1),
      labels: historical.map(h => new Date(h.date).toLocaleDateString()).reverse(),
      loadTimes: historical.map(h => h.avg_load_time).reverse(),
      pageViews: historical.map(h => h.page_views).reverse()
    });

  } catch (error) {
    console.error('Performance metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch performance metrics' });
  }
});


app.post('/errors/:error_id/resolve', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    await pool.query(
      'UPDATE error_logs SET is_handled = TRUE, resolution_notes = ? WHERE error_id = ?',
      [req.body.notes, req.params.error_id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error resolution failed:', error);
    res.status(500).json({ error: 'Failed to resolve error' });
  }
});


app.get('/performance-alerts', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const [alerts] = await pool.query(`
      SELECT * FROM website_performance 
      WHERE avg_load_time > 2.0 OR bounce_rate > 40
      ORDER BY date DESC
      LIMIT 10
    `);
    res.json(alerts);
  } catch (error) {
    console.error('Alert fetch failed:', error);
    res.status(500).json({ error: 'Failed to load alerts' });
  }
});

app.get('/error-correlations', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const [correlations] = await pool.query(`
      SELECT 
        a.error_code AS first_error,
        b.error_code AS second_error,
        COUNT(*) AS occurrence_count,
        AVG(TIMESTAMPDIFF(SECOND, a.timestamp, b.timestamp)) AS avg_seconds_between
      FROM error_logs a
      JOIN error_logs b ON 
        a.error_id < b.error_id AND
        a.environment = b.environment AND
        ABS(TIMESTAMPDIFF(MINUTE, a.timestamp, b.timestamp)) < 5
      WHERE a.timestamp > NOW() - INTERVAL 7 DAY
      GROUP BY first_error, second_error
      HAVING occurrence_count > 2
      ORDER BY occurrence_count DESC
      LIMIT 10
    `);
    
    res.json(correlations);
  } catch (error) {
    console.error('Correlation analysis failed:', error);
    res.status(500).json({ error: 'Failed to analyze error correlations' });
  }
});

app.get('/performance-benchmarks', authenticateToken, roleMiddleware('admin'), async (req, res) => {
  try {
    const [current] = await pool.query(`
      SELECT 
        AVG(avg_load_time) AS load_time,
        AVG(bounce_rate) AS bounce_rate,
        AVG(conversion_rate) AS conversion_rate
      FROM website_performance
      WHERE date > NOW() - INTERVAL 7 DAY
    `);
    
    const [baselines] = await pool.query('SELECT * FROM performance_baselines');
    
    const benchmarks = baselines.map(b => ({
      metric: b.metric,
      current_value: current[0][`${b.metric.replace('_', ' ').split(' ')[0]}_rate`] || current[0][b.metric],
      optimal: b.optimal_value,
      warning: b.warning_threshold,
      status: current[0][b.metric] > b.critical_threshold ? 'critical' : 
              current[0][b.metric] > b.warning_threshold ? 'warning' : 'normal'
    }));
    
    res.json(benchmarks);
  } catch (error) {
    console.error('Benchmark analysis failed:', error);
    res.status(500).json({ error: 'Failed to calculate benchmarks' });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});