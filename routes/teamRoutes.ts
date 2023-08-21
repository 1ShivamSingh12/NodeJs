import Router from "koa-router";
import { verifyToken } from "../middleware/verifytoken";
import { teams } from "../controller/team";

const teamRoute = new Router();

teamRoute.post("/createTeam", verifyToken, teams.teamInsertion);

teamRoute.get("/getTeam/:id", verifyToken, teams.teamDetail);

teamRoute.post("/updateTeam/:id", verifyToken, teams.updateTeam);

export default teamRoute;
