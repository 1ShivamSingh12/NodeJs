import Router from "koa-router";
import { onboarding } from "../controller/userController";
import { teams } from "../controller/team";
import { verifyToken } from "../middleware/token";
import { Multer } from "../service/multer.service";
import { loginSchema, registerValidator } from "../validation/userValidation";

const userRoute = new Router();

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

userRoute.post("/signUp", registerValidator, onboarding.signUp);

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

userRoute.post("/login", loginSchema, onboarding.login);




export default userRoute;
