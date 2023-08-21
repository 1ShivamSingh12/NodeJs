import Koa from "koa";
import Router from "koa-router";
import swaggerJsdoc from "swagger-jsdoc";

const router = new Router();
const app = new Koa();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cricket Tournament",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3400/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./swagger/*"],
};

export const swaggerDocs = swaggerJsdoc(options);
