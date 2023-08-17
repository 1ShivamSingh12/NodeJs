import Router from "koa-router";
import { verifyToken } from "../middleware/token";
import { teams } from "../controller/team";

const teamRoute = new Router();


/**
 * @openapi
 * /createTeam:
 *   post:
 *     tags:
 *     - Team
 *     description: Create Team.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: SignUp successful
 *       400:
 *         description: Bad request. Invalid.
 */

teamRoute.post("/createTeam", verifyToken, teams.teamInsertion);


/**
 * @openapi
 * /getTeam/{id}:
 *   get:
 *     tags:
 *     - Team
 *     description: Get Team.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the team.
 *     responses:
 *       201:
 *         description: successful
 *       400:
 *         description: Bad request. Invalid.
 */

teamRoute.get("/getTeam/:id",  verifyToken, teams.teamDetail);


teamRoute.post("/updateTeam/:id",  verifyToken, teams.updateTeam);


export default teamRoute
