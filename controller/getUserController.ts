import { userData } from "../models/insta_user";
import { Request , Response } from "express";



export const getUsers =  async(req:Request,res:Response)=>{
    console.log(req.body);
    
    let users = await userData.find()
    res.send(users)

}