const express = require('express');
const cors = require('cors');
const pgTaskRoutes = require('./routes/pgTaskRoutes');
const mongoTaskRoutes = require('./routes/mongoTaskRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pg/tasks', pgTaskRoutes);
app.use('/mongo/tasks', mongoTaskRoutes);
app.use('/pg/todos', pgTaskRoutes);
app.use('/mongo/todos', mongoTaskRoutes);

module.exports = app;

