import { Context } from "koa-swagger-decorator";
import Koa from "koa";
import Router from "koa-router";
import { koaSwagger } from 'koa2-swagger-ui';
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
    schemas: ["http", "https"],
    "securityDefinitions": {
      "AuthToken": {
        "type": "apiKey",
        "name": "auth-token",
        "in": "header",
        "description": "The token for authentication"
      }
    },
  "security": [
      {
        "AuthToken": []
      }
    ],
    servers: [
      {
        url: "http://localhost:3400/",
      },
    ],
  },
  apis: ["./routes/userRoutes.ts","./routes/teamRoutes.ts","./routes/playerRoutes.ts","./routes/matchRoutes.ts"],
};
export const swaggerDocs = swaggerJsdoc(options);
