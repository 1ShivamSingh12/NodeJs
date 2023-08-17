import Router from "koa-router";
import { match } from "../controller/matchController";
import { verifyToken } from "../middleware/token";
import { matchUpdateSchema } from "../validation/matchValidation";

const matchRoute = new Router();

/**
 * @openapi
 * /createMatch:
 *   post:
 *     tags:
 *     - Match
 *     description: Create Team.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     responses:
 *       201:
 *         description: SignUp successful
 *       400:
 *         description: Bad request. Invalid.
 */

matchRoute.post("/createMatch", verifyToken, match.createMatch);

/**
 * @openapi
 * /matchUpdate/{id}:
 *   post:
 *     tags:
 *     - Match
 *     description: Update the Match.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the match.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batterId:
 *                 type: string
 *               bowlerId:
 *                 type: string
 *               ball:
 *                 type: number
 *               Runs:
 *                 type: number
 *               four:
 *                 type: number
 *               Six:
 *                 type: number
 *     responses:
 *       201:
 *         description: Match updated successfully
 *       400:
 *         description: Bad request. Invalid.
 */

matchRoute.post("/matchUpdate/:id",  matchUpdateSchema , verifyToken , match.matchUpdate);


export default matchRoute