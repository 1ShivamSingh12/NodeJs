import swaggerJSDoc from "swagger-jsdoc";
import express, { Application } from "express";
import swaggerui from "swagger-ui-express";
import { createClient } from "redis";

const app = express();

app.use(express.json());

export const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "olx API Docs",
      version: "1.0.0",
    },
    schemas: ["http", "https"],
    servers: [
      {
        url: "http://localhost:7000/",
      },
    ],
  },
  apis: ["./routes/routes.ts"],
};

const swaggerDocs = swaggerJSDoc(options);

export const swaggerDoc = async (app: Application) => {
  try {
    app.use("/api", swaggerui.serve, swaggerui.setup(swaggerDocs));
    await client.connect();

    console.log(`swagger running at http://localhost:7000/api`);
  } catch (error) {
    console.log(error);
  }
};
