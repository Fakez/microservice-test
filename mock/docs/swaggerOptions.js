const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1',
  
      info: {
        title: "GPTW Test - Mock",
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        },
      },
      security: [{
        bearerAuth: []
      }],
    },
    apis: ["app.js"],
    security: [ { bearerAuth: [] } ],
};

module.exports = swaggerOptions
