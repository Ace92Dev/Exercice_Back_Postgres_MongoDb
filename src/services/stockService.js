function applyMovement(currentStock, type, quantity) {
  if (quantity <= 0 || !Number.isFinite(quantity)) {
    throw new Error('Invalid quantity');
  }
  if (type === 'IN') {
    return currentStock + quantity;
  }
  if (type === 'OUT') {
    if (currentStock - quantity < 0) {
      throw new Error('Insufficient stock');
    }
    return currentStock - quantity;
  }
  throw new Error('Invalid movement type');
}

module.exports = { applyMovement };

