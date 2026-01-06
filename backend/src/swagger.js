// src/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat App API",
      version: "1.0.0",
      description: "API documentation for the WhatsApp-style chat application",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt", // you are using res.cookie("jwt", ...)
        },
      },
    },
  },
  // Tell swagger-jsdoc where to look for the JSDoc comments
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
