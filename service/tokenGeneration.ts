import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import * as dotenv from "dotenv";
import { Sessions } from "../models/Session";
import { client } from "../config/db";

dotenv.config();

const key: string = <string>process.env.SECRETKEY;

export const generateToken = async (req: Request, res: Response) => {

  console.log(Sessions);
  

  const token = jwt.sign(req.body.id, key);

  let session_payload = {
    user_id: req.body.id,
    sessionId: "1234ytfy",
    deviceType: "Goggle Chrome",
  };
  
  let data : Sessions = await Sessions.create(session_payload)
  console.log(data);
  
  
  res.send(token);
  
  try {
    if(!data){
        let result = await client.set(
          `${req.body.id}_session`,
          JSON.stringify(session_payload)
        );
      
        let result1 = await client.get(`${req.body.id}_session`);
        
        console.log(result1,'redis');
      
    }else{
      res.send('Already Exist')
    }
  } catch (error) {
    console.log(error);
    
  }

};

