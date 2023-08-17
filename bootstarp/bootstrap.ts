import Koa from "koa";
import * as dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import koaBody from "koa-body";
import router from "../routes/userRoutes";
import { connectDB } from "../connection/db";
import { subscribe } from "../rabbit/subscriber";
// import { routes } from "../routes/routes";
import { SwaggerOptions, koaSwagger } from "koa2-swagger-ui";
import { swaggerDocs } from "../connection/swagger";

export class App {
  private app: Koa;
  private port = process.env.PORT;

  constructor() {
    this.startApplication();
    console.log("construictor");
  }

  private startApplication() {
    this.app = new Koa();
    this.globalMiddlewares();
    this.loadRoutes();
    this.server();
  }

  private globalMiddlewares() {
    dotenv.config();
    this.app.use(bodyParser());

    this.app.use(
      koaSwagger({
        routePrefix: "/swagger",
        swaggerOptions: {
          spec: swaggerDocs as SwaggerOptions["spec"],
        },
      })
    );
  }

  private loadRoutes() {
    // this.app.use(routes.loadAllRoutes);
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
    this.app.use(koaBody({ multipart: true }));
  }

  private server() {
    this.app.listen(this.port, async () => {
      console.log(`Listening to port ${this.port}`);
      await connectDB();
      subscribe();
    });
  }
}
