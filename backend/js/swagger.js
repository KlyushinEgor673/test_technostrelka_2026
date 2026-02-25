const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentation',
    description: 'Subscription Monitoring API'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey', // Меняем на apiKey
      name: 'Authorization', // Имя заголовка
      in: 'header', // Где искать (header, query, cookie)
      description: 'Введите JWT токен в формате: Bearer {token}'
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);