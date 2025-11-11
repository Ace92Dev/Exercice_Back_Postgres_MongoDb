const Movements = require('../models/pgMovementModel');
const Products = require('../models/pgProductModel');
const { applyMovement } = require('../services/stockService');

async function list(req, res) {
  const rows = await Movements.list();
  res.json(rows);
}

async function create(req, res) {
  const { productId, type, quantity } = req.body;
  const product = await Products.getById(productId);
  if (!product) return res.status(404).json({ error: 'product not found' });
  let newStock;
  try {
    newStock = applyMovement(product.stock, type, quantity);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  await Products.setStock(product.id, newStock);
  const movement = await Movements.create({ productId: product.id, type, quantity });
  res.status(201).json({ movement, newStock });
}

module.exports = { list, create };

