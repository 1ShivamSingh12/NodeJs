import Router from "koa-router";
import { onboarding } from "../controller/userController";
import * as dotenv from "dotenv";
import { teams } from "../controller/team";
import { verifyToken } from "../middleware/token";
import { players } from "../controller/playerController";
import { Multer } from "../service/multer";
import { loginSchema, registerValidator } from "../validation/userValidation";
import Joi from "joi";
import { match } from "../controller/matchController";

const validate = require("koa-joi-validate");
// import validate from "koa-joi-validate";

dotenv.config();

const key: string = <string>process.env.SECRETKEY;

const router = new Router();

/**
 * @openapi
 * /signUp:
 *   post:
 *     tags:
 *     - Admin
 *     description: Register User.
 *     requestBody:
 *       description: User object that needs to be added to the system.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: SignUp successful
 *       400:
 *         description: Bad request. Invalid.
 */

router.post("/signUp", registerValidator, onboarding.signUp);

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *     - Admin
 *     description: Login User.
 *     requestBody:
 *       description: User object that needs to be added to the system.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Bad request. Invalid.
 */

router.post("/login", loginSchema, onboarding.login);

/**
 * @openapi
 * /createTeam:
 *   post:
 *     tags:
 *     - Team
 *     description: Create Team.
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

router.post("/createTeam", verifyToken, teams.teamInsertion);

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

router.get("/getTeam/:id",  verifyToken, teams.teamDetail);

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

router.post("/createMatch", verifyToken, match.createMatch);

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

router.post("/matchUpdate/:id", verifyToken , match.matchUpdate);

router.post("/wicket/:id", match.wicketUpdate);

export default router;
