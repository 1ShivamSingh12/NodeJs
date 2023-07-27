import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import * as dotenv from "dotenv";
import { client } from "../config/db";
import { Sessions } from "../models/session";

dotenv.config();

const key: string = <string>process.env.SECRETKEY;

export const generateToken = async (req: Request, res: Response) => {

  const token = jwt.sign(req.body.id, key);

  let session_payload = {
    user_id: req.body.id,
    sessionId: "1234ytfy",
    deviceType: "Goggle Chrome",
  };
  
  res.send(token);
  
  let user_session  = await Sessions.create(session_payload);
  console.log(user_session, "lll");


  let result = await client.set(
    `${req.body.id}_session`,
    JSON.stringify(session_payload)
  );

  let result1 = await client.get(`${req.body.id}_session`);
  
  console.log(result1,'redis');
  
  // try {
  //   if(!user_exist){
      
  //   }else{
  //     res.send('Already Exist')
  //   }
  // } catch (error) {
  //   console.log(error);
    
  // }

};
