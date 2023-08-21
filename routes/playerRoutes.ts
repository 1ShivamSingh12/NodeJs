import Router from "koa-router";
import { verifyToken } from "../middleware/verifytoken";
import { players } from "../controller/playerController";

const playerRouter = new Router();

playerRouter.post("/createPlayer", verifyToken, players.playerInsertion);

playerRouter.get("/getPlayer/:id", verifyToken, players.getPlayers);

playerRouter.post("/playerUpdate/:id", verifyToken, players.playerUpdate);

export default playerRouter;
