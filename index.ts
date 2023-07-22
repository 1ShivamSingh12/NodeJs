import express, { Application } from "express";
import connectDB from "./db";
import * as dotenv from "dotenv";
import { swaggerDoc } from "./utils/swagger";
import { routes } from "./routes/routes";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());

routes(app);

app.use(cors());

app.listen(port, async () => {
  console.log(`Listening at port ${port}`);
  await connectDB();
  swaggerDoc(app);
});
