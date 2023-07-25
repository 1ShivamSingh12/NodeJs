import { userData } from "../models/insta_user";
import { Request , Response } from "express";
import { loginSchema, registerSchema } from "../validation/userValidate";
import { generateToken } from "../service/generateToken";
import bcrypt from "bcrypt";



export const getUsers =  async(req:Request,res:Response)=>{
    console.log(req.body);
    
    let users = await userData.find()
    res.send(users)

}


export const loginUser = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      
      const error = loginSchema.validateAsync(req.body);
      
      const { email, password } = req.body;
  
      console.log(req.body);
      
      if (email && password) {
        let user = await userData.findOne({ email: req.body.email });
        
  
        if (user) {
          
          req.body.id = user?.id;
          console.log('lllll');
          
          generateToken(req, res);
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  };


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
  