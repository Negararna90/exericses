const express = require('express');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const app = express();

// Create database connection
const sequelize = new Sequelize('app', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define user model
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  nationalCode: Sequelize.STRING,
  password: Sequelize.STRING
});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database synced successfully.');
});

// Define register endpoint
app.post('/register', async (req, res) => {
  try {
    // Get national code, email, and password from request
    const { nationalCode, email, password } = req.body;

    // Add the user to the database using sequelize
    const user = await User.create({ nationalCode, email, password });

    // Add user to local array
    const Users = [];
    Users.push(user);

    // Create token using jwt
    const token = jwt.sign({ email }, 'secret-key');

    // Set cookie with token
    res.cookie('token', token, { httpOnly: true });

    // Return success message
    res.json({ message: 'success' });
  } catch (error) {
    // Handle error
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});