const express = require('express');
const cors = require('cors');
const pgTaskRoutes = require('./routes/pgTaskRoutes');
const mongoTaskRoutes = require('./routes/mongoTaskRoutes');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./graphql/schema');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.use('/pg/tasks', pgTaskRoutes);
app.use('/mongo/tasks', mongoTaskRoutes);
app.use('/pg/todos', pgTaskRoutes);
app.use('/mongo/todos', mongoTaskRoutes);

// Example route from slides: decode JWT from Authorization header
app.get('/accessResource', (req, res) => {
  const header = req.headers && req.headers.authorization;
  const token = header ? header.split(' ')[1] : undefined; // 'Bearer TOKEN'
  if (!token) {
    return res.status(200).json({ success: false, message: 'Error!Token was not provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return res.status(200).json({ success: true, data: { userId: decoded.userId, email: decoded.email } });
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = app;
