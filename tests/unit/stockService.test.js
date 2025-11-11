const { applyMovement } = require('../../src/services/stockService');

test('IN increases stock', () => {
  expect(applyMovement(10, 'IN', 5)).toBe(15);
});

test('OUT decreases stock', () => {
  expect(applyMovement(10, 'OUT', 3)).toBe(7);
});

test('OUT cannot go below zero', () => {
  expect(() => applyMovement(2, 'OUT', 5)).toThrow('Insufficient stock');
});

