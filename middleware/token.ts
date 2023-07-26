import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { SessionData } from "../models/session";
import * as dotenv from "dotenv";
import { client } from "../utils/swagger";

dotenv.config();

const key:string = <string>process.env.SECRETKEY

export const verifyToken = (req: Request, res: Response, next: any) => {
  const tokenToVerify: string = <string>req.headers.authorization;
  console.log(tokenToVerify);

  try {
    jwt.verify(tokenToVerify, key, async (err: any, decodeToken: any) => {
      if (!err) {
        
        req.body.user_id = decodeToken;
        console.log(decodeToken);
        
        console.log(req.body);
        

        let findSession:any = (await client.get(`${decodeToken}_session`)) ||  (await SessionData.find({ user_id: decodeToken }));
        console.log(JSON.parse(findSession).user_id, "sdfwefwe");

        if (findSession.length != 0) {
          next();
        } else {
          res.send("Invalid User");
        }
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};



// redis casess