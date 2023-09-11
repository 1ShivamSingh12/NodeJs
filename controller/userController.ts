import { Context } from "koa";
import { userService } from "../service/user.service";
import nodemailer from "nodemailer";

export class onboarding {
  static signUp = async (ctx: Context) => {
    try {
      const response = await userService.registerUser(ctx);
      ctx.status = 200;
      ctx.response.body = "Successfuly Insertion";
    } catch (error) {
      ctx.status = 500;
      ctx.response.body = "Error";
    }
  };

  static login = async (ctx: Context) => {
    try {
      const response = await userService.loginUser(ctx);
      console.log(response);

      ctx.status = 200;
      ctx.response.body = response;
    } catch (error) {
      ctx.status = 500;
      ctx.response.body = "Error";
    }
  };

  static generateOTP = async (ctx: Context) => {
    try {
      const response = await userService.generateOTP(ctx);
      if (response) {
        ctx.status = 200;
        ctx.response.body = { message: "Email Send" };
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifyOTP = async (ctx: Context) => {
    try {
      const response = await userService.verifyOTP(ctx);
      if (response == "Verified") {
        ctx.status = 200;
        ctx.response.body = { message: "Otp Verified" };
      } else {
        ctx.status = 500
        ctx.response.body = {message:"Otp Not Verified"}
      }
    } catch (error) {
      ctx.response.body = error
    }
  };
}
