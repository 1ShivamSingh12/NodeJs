import Koa, { Context } from "koa";
import * as dotenv from "dotenv";
import { connectDB } from "./connection/db";
import router from "./routes/userRoutes";
import bodyParser from "koa-bodyparser";
import koaBody from "koa-body";
import Router from "koa-router";
import { subscribe } from "./rabbit/subscriber";
import { swaggerDocs } from "./connection/swagger";
import { SwaggerOptions, koaSwagger } from "koa2-swagger-ui";
// import { App } from "./bootstarp/bootstrap";


// import { swaggerDoc } from "./connection/swagger";
// import { ui, validate } from "swagger2-koa";


// (async () => {
//   try {
//     new App();
//   } catch (error) {
//     console.log(erroverifyTokenr);
//   }
// })();


const app = new Koa();

dotenv.config();

const port = process.env.PORT;

app.use(bodyParser())

app.use(router.routes());
app.use(router.allowedMethods());

app.use(koaBody({ multipart: true }));

app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      spec: swaggerDocs as SwaggerOptions['spec'],
    },
  })
);


app.listen(port, async () => {
  console.log(`Listening to port ${port}`);
  await connectDB();
  subscribe()
});



// grpc for microservice , handle bars , faafka , const object updation and array call by vlaue and call ny reference