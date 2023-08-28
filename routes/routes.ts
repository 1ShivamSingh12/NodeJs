import Router from "koa-router";

const allRoutes  = new Router()

import userRoute from "./userRoutes";
import matchRoute from "./matchRoutes";
import teamRoute from "./teamRoutes";
import playerRouter from "./playerRoutes";

allRoutes.use(userRoute.routes(), userRoute.allowedMethods());
allRoutes.use(matchRoute.routes(), matchRoute.allowedMethods());
allRoutes.use(teamRoute.routes(), teamRoute.allowedMethods());
allRoutes.use(playerRouter.routes(), playerRouter.allowedMethods());


export default allRoutes







