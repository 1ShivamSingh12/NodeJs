import { Context } from "koa";
import { userData } from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../service/tokenGeneration";

export class onboarding {
  static signUp = async (ctx: Context) => {
    try {
      let requestBody: any = ctx.request.body;

      const emailMatch = await userData.findOne({ email: requestBody.email });

      if (!emailMatch) {
        let securePass = await bcrypt.hash(requestBody.password, 10);
        requestBody.password = securePass;

        const user = await userData.insertMany([{ ...requestBody }]);

        if (user) {
          ctx.response.body = "Successfuly Insertion";
          ctx.respoonse.status = 200;
        } else {
          console.log("Error in insertion");
        }
      } else {

        throw new Error("Email already exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (ctx: Context) => {
    try {

      let requestBody = ctx.request.body;

      const { email, password }: any = ctx.request.body;

      if (email && password) {
        const user = await userData.findOne({ email: email });

        if (user?.role == "admin") {
          const matchPass = await bcrypt.compare(
            password,
            <string>user?.password
          );

          if (matchPass) {
            generateToken(user?.id, ctx);
          } else {
            ctx.response.body = "Password is incorrect";
          }
        }
      } else {
        return ctx.throw(401, "Authentication Failed");
      }

    } catch (error) {
      console.log(error);
    }
  };
}
