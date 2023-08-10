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
 * /signup:
 *   post:
 *     tags:
 *     - User
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

router.post("/login", loginSchema, onboarding.login);

router.post("/team", verifyToken, teams.teamInsertion);


router.get("/getTeam", teams.teamDetail);

router.post("/createMatch", match.createMatch);

router.post("/matchUpdate/:id", match.matchUpdate);

export default router;
