import { Response, Request } from "express";
import { User } from "../models/userModel";


export const fetchUsers = async(req:Request , res:Response)=>{
    console.log(req.query);
    
    const page: number = parseInt(req.query.page as string); 
    const limit: number = parseInt(req.query.limit as string); 

    
    const offset = (page - 1) * limit;

    

    const users = await User.findAll({limit,offset});    
    res.send(users)
    
}