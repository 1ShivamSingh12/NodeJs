import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { SessionData } from "../models/session";
import { createClient } from "redis";

const client = createClient();

const secretKey = "qwetygjkvuyfy";

export const generateToken = async (req: Request, res: Response) => {
    await client.connect();
    console.log(req.body.id , 'token');
    
    const token = jwt.sign(req.body.id, secretKey);
  
    let session_payload: object = {
      user_id: req.body.id,
      device_id: "1234",
      device_type: "Goggle Chrome",
    };

    await SessionData.insertMany([session_payload]);
  
    let result = await client.set(`${req.body.id}_session`,JSON.stringify(session_payload));
  
    let result1 = await client.get(`${req.body.id}_session`);
  
    console.log(result1);
  
    res.send(token);

  };
  