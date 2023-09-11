import Router from "koa-router";
import { onboarding } from "../controller/userController";
import { loginSchema, registerValidator } from "../validation/userValidation";

const userRoute = new Router();

userRoute.post("/signUp", registerValidator, onboarding.signUp);

userRoute.post("/login", loginSchema, onboarding.login);

userRoute.post("/sendOTP" , onboarding.generateOTP)

userRoute.post("/verifyOTP" , onboarding.verifyOTP)


export default userRoute;
