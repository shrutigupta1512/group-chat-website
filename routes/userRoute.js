const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt');
const path = require('path');

// Serve the signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/signup.html'));
});

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
  
    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Check if user already exists by email
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user with the hashed password
      await db.execute(
        'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashedPassword]
      );
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;