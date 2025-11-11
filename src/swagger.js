const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StockLink Pro API',
      version: '1.0.0',
      description: 'API sécurisée pour StockLink (auth, produits, mouvements, entrepôts)'
    },
    servers: [{ url: 'http://localhost:' + (process.env.PORT || 3000) }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

// Minimal paths inline, to keep in JS
swaggerSpec.paths = swaggerSpec.paths || {};
swaggerSpec.paths['/auth/register'] = {
  post: {
    summary: 'Register user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
              role: { type: 'string', enum: ['user', 'admin'] }
            },
            required: ['username', 'password']
          }
        }
      }
    },
    responses: { '201': { description: 'Created' } }
  }
};

swaggerSpec.paths['/auth/login'] = {
  post: {
    summary: 'User login',
    requestBody: {
      required: true,
      content: { 'application/json': { schema: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } }, required: ['username','password'] } } }
    },
    responses: { '200': { description: 'OK' }, '401': { description: 'Invalid credentials' } }
  }
};

swaggerSpec.paths['/products'] = {
  get: { summary: 'List products', responses: { '200': { description: 'OK' } } },
  post: {
    summary: 'Create product',
    security: [{ bearerAuth: [] }],
    requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, stock: { type: 'integer', minimum: 0 } }, required: ['name'] } } } },
    responses: { '201': { description: 'Created' } }
  }
};

swaggerSpec.paths['/products/{id}'] = {
  put: {
    summary: 'Update product',
    security: [{ bearerAuth: [] }],
    parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
    requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, stock: { type: 'integer', minimum: 0 } } } } } },
    responses: { '200': { description: 'OK' } }
  },
  delete: {
    summary: 'Delete product',
    security: [{ bearerAuth: [] }],
    parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
    responses: { '204': { description: 'No Content' }, '403': { description: 'Admin only' } }
  }
};

swaggerSpec.paths['/movements'] = {
  get: { summary: 'List movements', responses: { '200': { description: 'OK' } } },
  post: {
    summary: 'Create movement',
    security: [{ bearerAuth: [] }],
    requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { productId: { type: 'integer' }, type: { type: 'string', enum: ['IN','OUT'] }, quantity: { type: 'integer', minimum: 1 } }, required: ['productId','type','quantity'] } } } },
    responses: { '201': { description: 'Created' } }
  }
};

swaggerSpec.paths['/warehouses'] = {
  get: { summary: 'List warehouses', responses: { '200': { description: 'OK' } } },
  post: { summary: 'Create warehouse', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } } }, responses: { '201': { description: 'Created' } } }
};

swaggerSpec.paths['/warehouses/{id}/locations'] = {
  get: { summary: 'List locations', parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
  post: { summary: 'Create location', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } } }, responses: { '201': { description: 'Created' } } },
  put: { summary: 'Update location', security: [{ bearerAuth: [] }], parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } }, required: ['id'] } } } }, responses: { '200': { description: 'OK' } } }
};

module.exports = { swaggerSpec };

