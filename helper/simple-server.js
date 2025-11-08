const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Simple server is working!',
    timestamp: new Date().toISOString()
  });
});

// Test auth route
app.post('/api/auth/register', (req, res) => {
  console.log('Registration request received:', req.body);
  res.json({
    success: true,
    message: 'Test registration endpoint',
    data: {
      token: 'test-token',
      user: {
        id: '123',
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'user'
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server is running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Also try: http://127.0.0.1:${PORT}/api/health`);
});