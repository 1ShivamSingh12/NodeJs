import Router from "koa-router";
import { match } from "../controller/matchController";
import { verifyToken } from "../middleware/verifytoken";
import { matchUpdateSchema } from "../validation/matchValidation";

const matchRoute = new Router();

matchRoute.post("/createMatch", verifyToken, match.createMatch);

matchRoute.patch(
  "/matchUpdate/:id",
  matchUpdateSchema,
  verifyToken,
  match.matchUpdate
);

export default matchRoute;
