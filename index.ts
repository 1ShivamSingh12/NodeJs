import Koa, { Context } from "koa";
import * as dotenv from "dotenv";
import { connectDB } from "./connection/db";
import router from "./routes/userRoutes";
import bodyParser from "koa-bodyparser";
import koaBody from "koa-body";
import Router from "koa-router";
import { subscribe } from "./rabbit/subscriber";
// import { swaggerDoc } from "./connection/swagger";
// import { ui, validate } from "swagger2-koa";


// (async () => {
//   try {
//     new App();
//   } catch (error) {
//     console.log(error);
//   }
// })();






const app = new Koa();

dotenv.config();

const port = process.env.PORT;

app.use(bodyParser())

app.use(router.routes());
app.use(router.allowedMethods());

app.use(koaBody({ multipart: true }));



app.listen(port, async () => {
  console.log(`Listening to port ${port}`);
  await connectDB();
  subscribe()
});



// grpc for microservice , handle bars , faafka , const object updation and array call by vlaue and call ny reference