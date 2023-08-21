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

// class Route {
   
//     private route: Router;

//     constructor() {

//         this.route = new Router();

//     }

//     loadAllRoutes() {

//         this.route.use('/' , playerRoutes.loadPLayerRoutes)

//         // this.route.use('/player' , playerRoutes.playerInsertion())

//         return this.route

//     }
   
// }








