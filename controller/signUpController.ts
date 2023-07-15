import { User } from "../models/userModel";
import { Request, Response } from "express";
import { registerSchema } from "../validation/userVAlidation";
import bcrypt from "bcrypt";


export const signUp = async (req: Request, res: Response) => {
  try {
    const { error } = await registerSchema.validateAsync(req.body);
    let securePass = await bcrypt.hash(req.body.password, 10);    
    let payload = {

        "name":req.body.name,
        "email":req.body.email,
        "password":securePass 
    }
    const user: User = await User.create(payload);
    res.send(user);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send({ message: "Error inserting user" });
  }
};

