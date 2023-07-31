import express, { Application } from "express";
import * as dotenv from "dotenv";
import {client, connection } from "./config/db";
import { swaggerDoc } from "./swaggerConnection/swagger";
import { onBoardingRoutes } from "./routes/onboardingRoutes";
import { productRoutes } from "./routes/productRoutes";


dotenv.config();

const port = process.env.PORT;

const app: Application = express();

app.use(express.json());

onBoardingRoutes(app)
productRoutes(app)


export let imageBlob:any;
app.listen(port, async() => {
  console.log(`Listening at port ${port}`);    

  await connection();
  await swaggerDoc(app)
  await client.connect()

});
