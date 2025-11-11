const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const movementRoutes = require('./routes/movementRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger');

const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/', (_req, res) => res.json({ name: 'StockLink Pro', status: 'ok' }));

// Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/movements', movementRoutes);
app.use('/warehouses', warehouseRoutes);

module.exports = app;
