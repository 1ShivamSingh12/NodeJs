import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  loginSchema,
  registerSchema,
} from "../validation/onboardingValidation";
import { Users } from "../models/userModels";
import { generateToken } from "../service/tokenGeneration";
import { Sessions } from "../models/Session";
import { client } from "../config/db";

export const signUp = async (req: Request, res: Response) => {


  try {
    const { error } = await registerSchema.validateAsync(req.body);
    let securePass = await bcrypt.hash(req.body.password, 10);
    req.body.password = securePass;
    let payload = {
      ...req.body,
      status: "active",
    };
    const user: Users = await Users.create(payload);
    res.send(user);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send({ message: "Error inserting user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  
  try {
    const error = loginSchema.validateAsync(req.body);

    const { email, password } = req.body;

    if (email && password) {
      const [user, a] = await Users.findAll({
        where: {
          email: email,
        },
      });
      console.log(user, "lllllllllllllllllllll");

      if (user) {
        req.body.id = user.dataValues.id;

        generateToken(req, res);
      }
    }
  } catch (error) {
    console.log(error);
  }
};



export const updateProfile = async (req: Request, res: Response) => {

  try {
    if(req.body){
      const updateData = await Users.update(
        { first_name: req.body.first_name },
        { where: { id: req.body.user_id } }
      );
      res.send('Updated')
    }else{
      res.send('Invalid')
    }
    
  } catch (error) {
    res.send(error)
  }
  
};


export const forgetPassword = async(req:Request , res:Response) =>{
  console.log(req.body);

  try {
    if(req.body){
      if(req.body.newPassword == req.body.confirmPassword){
        let securePass = await bcrypt.hash(req.body.newPassword, 10);
        const updateData = await Users.update(
          { password: securePass },
          { where: { id: req.body.user_id } }
        );

        res.send('Changed')
      }else{
        res.send('Password do not match')
      }
    }
  } catch (error) {
    
  }
  
}


export const getProfile = async(req:Request , res:Response) =>{
  
  let profile = await Users.findAll(
    {
      where:{
        id:req.body.user_id
      }
    }
  )

  res.send(profile)
}


export const logOut = async(req:Request , res:Response) =>{
  
  try {
    if(req.body){
      let result  = await Sessions.destroy({where:{user_id : req.body.user_id}})
      let redisUpdate = await client.DEL(`${req.body.user_id}_session`)
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

