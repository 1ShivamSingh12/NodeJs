import Router from "koa-router";
import { playerRoutes } from "./playerRoutes";


class Route {
   
    private route: Router;

    constructor() {
        this.route = new Router();
    }


    loadAllRoutes() {

        this.route.use('/' , )

        // this.route.use('/player' , playerRoutes.playerInsertion())


        return this.route
    }
   

}

export const Routes = new Route()



