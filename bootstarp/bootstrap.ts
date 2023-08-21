import Koa from "koa";
import * as dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import { connectDB } from "../connection/db";
import { subscribe } from "../rabbit/subscriber";
import { SwaggerOptions, koaSwagger } from "koa2-swagger-ui";
import { swaggerDocs } from "../connection/swagger";
import allRoutes from "../routes/routes";

export class App {
  private app: Koa;
  private port = process.env.PORT;

  constructor() {
    this.startApplication();
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
    this.app.use(allRoutes.routes());
  }

  private server() {
    this.app.listen(this.port, async () => {
      console.log(`Listening to port ${this.port}`);
      await connectDB();
      subscribe();
    });
  }
}
