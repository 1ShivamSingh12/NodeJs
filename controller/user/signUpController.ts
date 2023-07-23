import { userData } from "../../models/insta_user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { registerSchema } from "../../validation/userValidate";

export const registerUser = async (req: Request, res: Response) => {
  try {
    if (req.body) {
      const error = registerSchema.validateAsync(req.body);
      let user = await userData.findOne({ email: req.body.email });
      if (!user) {
        let securePass = await bcrypt.hash(req.body.password, 10);
        req.body.password = securePass;
        await userData.insertMany([req.body]);
      } else {
        res.send("User Exist");
      }
    }
  } catch (err) {
    console.log("error>>>>>", err);
  }
};


// joi validation