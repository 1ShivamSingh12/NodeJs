// import { Context } from "koa-swagger-decorator";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-koa";
// import Koa from "koa";
// import Router from "koa-router";

// const router = new Router();
// const app = new Koa();

// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Cricket Tournament",
//       version: "1.0.0",
//     },
//     schemas: ["http", "https"],
//     servers: [
//       {
//         url: "http://localhost:3400/",
//       },
//     ],
//   },
//   apis: ["./routes/userRoutes.ts"],
// };
// const swaggerDocs = swaggerJSDoc(options);

// export const swaggerDoc = async () => {
//   try {
    // app.use(swaggerUi.serve);
//     router.get('/swagger-html', swaggerUi.setup(swaggerDocs));

//     console.log(`swagger running at http://localhost:3400/api`);
//   } catch (error) {
//     console.log(error);
//   }
// };
