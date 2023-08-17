import Router from "koa-router";
import { verifyToken } from "../middleware/token";
import { players } from "../controller/playerController";

const playerRouter = new Router();


/**
 * @openapi
 * /createPlayer:
 *   post:
 *     tags:
 *     - Player
 *     description: Create Player.
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Age:
 *                 type: number
 *     responses:
 *       201:
 *         description: SignUp successful
 *       400:
 *         description: Bad request. Invalid.
 */

playerRouter.post("/createPlayer", verifyToken, players.playerInsertion);


/**
 * @openapi
 * /getPlayer/{id}:
 *   get:
 *     tags:
 *     - Player
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

playerRouter.get("/getPlayer/:id", verifyToken, players.getPlayers);



playerRouter.post("/playerUpdate/:id", verifyToken, players.playerUpdate);




export default playerRouter