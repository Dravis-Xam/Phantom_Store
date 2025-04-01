import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); 

// Database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.VITE_MYSQL_PASS,
    database: 'appstore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const saltRounds = 10;

// Enhanced middleware
const roleMiddleware = (role) => async (req, res, next) => {
    const user_id = req.body.user_id || req.query.user_id;
    if (!user_id) return res.status(403).json({ error: 'Authentication required' });

    try {
        const [rows] = await pool.query(
            'SELECT type FROM users WHERE user_id = ?',
            [user_id]
        );
        
        if (!rows.length || rows[0].type !== role) {
            return res.status(403).json({ error: `${role} privileges required` });
        }
        
        req.user = { id: user_id, type: role };
        next();
    } catch (error) {
        console.error('Middleware error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Auth Routes
app.post('/register', async (req, res) => {
    const { username, email, password, type } = req.body;

    // Default values for optional fields
    const defaults = {
        full_name: username,
        company_name: type === 'developer' ? 'Individual Developer' : null,
        website: null,
        address: null
    };

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const [result] = await pool.query(
            `INSERT INTO users 
            (username, email, password_hash, type, full_name, company_name, website, address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username,
                email,
                hash,
                type,
                defaults.full_name,
                defaults.company_name,
                defaults.website,
                defaults.address
            ]
        );
        
        res.json({ 
            message: 'User registered!', 
            user_id: result.insertId,
            user: {
                user_id: result.insertId,
                type: type,
                email: email,
                company_name: defaults.company_name
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!rows.length) return res.status(404).json({ error: 'User not found' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: 'Invalid password' });

        res.json({
            message: 'Login successful!',
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

// App Routes
app.get('/apps', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM apps WHERE status = "approved" ORDER BY created_at DESC LIMIT 100'
        );
        res.json(rows);
    } catch (error) {
        console.error('Apps fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch apps' });
    }
});

// Developer Routes
app.get('/developer/apps', roleMiddleware('developer'), async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM apps WHERE developer_id = ?',
            [req.user.id]
        );
        res.json(rows);
    } catch (error) {
        console.error('Developer apps error:', error);
        res.status(500).json({ error: 'Failed to fetch developer apps' });
    }
});

app.post('/developer/apps', roleMiddleware('developer'), async (req, res) => {
    const { name, description, icon_url, download_url, category_id } = req.body;
    
    if (!name || !description || !icon_url || !download_url || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO apps 
            (name, description, icon_url, download_url, category_id, developer_id, status)
            VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
            [name, description, icon_url, download_url, category_id, req.user.id]
        );
        
        res.json({ message: 'App submitted!', app_id: result.insertId });
    } catch (error) {
        console.error('App submission error:', error);
        res.status(500).json({ error: 'App submission failed' });
    }
});

app.delete('/developer/apps/:app_id', roleMiddleware('developer'), async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM apps WHERE app_id = ? AND developer_id = ?',
            [req.params.app_id, req.user.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'App not found' });
        }
        
        res.json({ message: 'App deleted successfully' });
    } catch (error) {
        console.error('App deletion error:', error);
        res.status(500).json({ error: 'Failed to delete app' });
    }
});

// Admin Routes
app.get('/admin/apps', roleMiddleware('admin'), async (req, res) => {
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

app.put('/admin/apps/:app_id/approve', roleMiddleware('admin'), async (req, res) => {
    try {
        await pool.query(
            'UPDATE apps SET status = "approved" WHERE app_id = ?',
            [req.params.app_id]
        );
        res.json({ message: 'App approved successfully' });
    } catch (error) {
        console.error('Approval error:', error);
        res.status(500).json({ error: 'Failed to approve app' });
    }
});

app.post('/admin/apps/:app_id/reject', roleMiddleware('admin'), async (req, res) => {
    const { rejection_reason } = req.body;
    
    if (!rejection_reason) {
        return res.status(400).json({ error: 'Rejection reason required' });
    }

    try {
        await pool.query('BEGIN');
        
        await pool.query(
            'UPDATE apps SET status = "rejected" WHERE app_id = ?',
            [req.params.app_id]
        );
        
        await pool.query(
            `INSERT INTO app_rejections 
            (app_id, rejection_reason, rejected_by)
            VALUES (?, ?, ?)`,
            [req.params.app_id, rejection_reason, req.user.id]
        );
        
        await pool.query('COMMIT');
        res.json({ message: 'App rejected successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Rejection error:', error);
        res.status(500).json({ error: 'Failed to reject app' });
    }
});

// Website Performance
const updateWebsitePerformance = async () => {
    try {
        await pool.query(`
            UPDATE website_performance
            SET visits = (SELECT COUNT(*) FROM downloads),
                downloads = (SELECT COUNT(*) FROM downloads),
                reviews = (SELECT COUNT(*) FROM reviews)
            WHERE performance_id = 1
        `);
        console.log('Website stats updated');
    } catch (error) {
        console.error('Stats update error:', error);
    }
};

setInterval(updateWebsitePerformance, 300000);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});