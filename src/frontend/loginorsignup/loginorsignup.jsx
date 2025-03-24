import React, { useState } from 'react';
import './login.css';

export default function LoginSignupForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            if (data.user.type === 'developer') {
                window.location.href = 'http://localhost:5173/developers-panel.html';
            } else {
                window.location.href = 'http://localhost:5173/';
            }
        } else {
            alert(data.error || 'Login failed');
        }
      } catch (error) {
          alert('Login error: ' + error.message);
      }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                type: formData.role.toLowerCase()
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            if (data.user.type === 'developer') {
                window.location.href = 'http://localhost:5173/developers-panel.html';
            } else {
                window.location.href = 'http://localhost:5173/';
            }
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (error) {
        alert('Registration error: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`form-container ${isLogin ? '' : 'signup-mode'}`}>
        <div className="form-wrapper">
          <form onSubmit={handleLogin} className={`auth-form ${isLogin ? 'active' : ''}`}>
            <h2>Login</h2>
            <div className="input-group">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Password</label>
            </div>
            <button type="submit">Sign In</button>
          </form>

          <form onSubmit={handleSignup} className={`auth-form ${!isLogin ? 'active' : ''}`}>
            <h2>Create Account</h2>
            <div className="input-group">
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Username</label>
            </div>
            <div className="input-group">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label>Confirm Password</label>
            </div>
            <div className="input-group select-group">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your role</option>
                <option value="Developer">Developer</option>
                <option value="Client">Client</option>
              </select>
              <label>Role</label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-toggle">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin 
              ? 'Need an account? Sign Up'
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}