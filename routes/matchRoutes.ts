import Router from "koa-router";
import { players } from "../controller/playerController";
import { verifyToken } from "../middleware/token";
import { Multer } from "../service/multer";

export class playerRoute {
  private playerRoute: Router;

  constructor() {
    this.playerRoute = new Router();
  }

  playerInsertion() {
    this.playerRoute.post(
      "/insert",
      verifyToken,
      Multer.single("file"),
      players.playerInsertion
    );
  }
}

export const playerRoutes = new playerRoute();
