
import { App } from "./bootstarp/bootstrap";



(async () => {
  try {
    new App();
  } catch (error) {
    console.log('erroverifyTokenr');
  }
})();


// const app = new Koa();

// dotenv.config();

// const port = process.env.PORT;

// app.use(bodyParser())

// app.use(allRoutes.routes());

// app.use(koaBody({ multipart: true }));

// app.use(
//   koaSwagger({
//     routePrefix: '/swagger',
//     swaggerOptions: {
//       spec: swaggerDocs as SwaggerOptions['spec'],
//     },
//   })
// );


// app.listen(port, async () => {
//   console.log(`Listening to port ${port}`);
//   await connectDB();
//   subscribe()
// });



// grpc for microservice , handle bars , faafka , const object updation and array call by vlaue and call ny reference