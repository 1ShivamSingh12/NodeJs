import { Context } from "koa-swagger-decorator";
import swaggerJsdoc from "swagger-jsdoc";
import Koa from "koa";
import Router from "koa-router";
import { koaSwagger } from 'koa2-swagger-ui';


const router = new Router();
const app = new Koa();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cricket Tournament",
      version: "1.0.0",
    },
    schemas: ["http", "https"],
    servers: [
      {
        url: "http://localhost:3400/",
      },
    ],
  },
  apis: ["./routes/userRoutes.ts"],
};
export const swaggerDocs = swaggerJsdoc(options);
