import express, { Application } from "express";
import * as dotenv from "dotenv";
import {client, connection } from "./config/db";
import { swaggerDoc } from "./swaggerConnection/swagger";
import { routes } from "./routes/routes";
import path from 'path';
import fs from 'fs'

dotenv.config();

const port = process.env.PORT;

const app: Application = express();

app.use(express.json());

routes(app);

export let imageBlob:any;
app.listen(port, async() => {
  console.log(`Listening at port ${port}`);    

  await connection();
  await swaggerDoc(app)
  await client.connect()

});
