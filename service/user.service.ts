import { Context } from "koa";
import { UserEntity } from "../entity/userEntity";
import { generateToken } from "./token.service";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { client } from "../connection/db";

export class userService {
  static loginUser = async (ctx: Context) => {
    let requestBody = ctx.request.body;

    const { email, password }: any = ctx.request.body;

    if (email && password) {
      const user = await UserEntity.findOne({ email: email }, {}, {});

      if (user?.role == "admin") {
        const matchPass = await bcrypt.compare(
          password,
          <string>user?.password
        );

        if (matchPass) {
          return generateToken(user?.id, ctx);
        } else {
          ctx.status = 500;
          return (ctx.response.body = "Password is incorrect");
        }
      }
    } else {
      return (ctx.response.body = "Authentication Failed");
    }
  };

  static registerUser = async (ctx: Context) => {
    let requestBody: any = ctx.request.body;

    const emailMatch = await UserEntity.findOne(
      { email: requestBody.email },
      {},
      {}
    );

    if (!emailMatch) {
      let securePass = await bcrypt.hash(requestBody.password, 10);
      requestBody.password = securePass;

      const user = await UserEntity.insertMany([{ ...requestBody }], {});

      if (user) {
        return user;
      } else {
        return (ctx.respnse.body = "Error in insertion");
      }
    } else {
      return (ctx.respnse.body = "Email already exists");
    }
  };

  static generateOTP = async (ctx: Context) => {
    let requestBody: any = ctx.request.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivam.singh5@appinventiv.com",
        pass: "App@@2022#",
      },
    });

    let otp = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      to: requestBody.email,
      subject: "Your OTP for Forget Password",
      text: `Your OTP is: ${otp}`,
    };

    let data = await transporter.sendMail(mailOptions);
    if (data) {
      let otpSet = await client.set(`${requestBody.email}_otp`, otp);
      let otpExpire = client.expire(`${requestBody.email}_otp`,60)
      return data;
    }
  };

  static verifyOTP = async (ctx: Context) => {
    let requestBody: any = ctx.request.body;

    let otpGet = await client.get(`${requestBody.email}_otp`);

    if (otpGet == requestBody.otp) {
      return "Verified";
    } else {
      return "Not verfied";
    }
  };
}
