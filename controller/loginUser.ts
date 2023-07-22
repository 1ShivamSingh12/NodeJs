import { Request, Response } from "express";
import { userData } from "../models/insta_user";
import { loginSchema } from "../validation/userValidate";
import { generateToken } from "../middleware/token";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const error = loginSchema.validateAsync(req.body);

    const { email, password } = req.body;

    if (email && password) {
      let user = await userData.findOne({ email: req.body.email });

      if (user) {
        req.body.id = user?.id;
        generateToken(req, res);
      }
    }
  } catch (error) {}
};