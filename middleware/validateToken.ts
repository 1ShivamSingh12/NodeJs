import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { client } from "../config/db";
import { where } from "sequelize";
import { Sessions } from "../models/Session";

dotenv.config();

const key:string = <string>process.env.SECRETKEY

export const verifyToken = (req: Request, res: Response, next: any) => {
  const tokenToVerify: string = <string>req.headers.authorization;
  console.log(tokenToVerify,'token');

  try {
    jwt.verify(tokenToVerify, key, async (err: any, decodeToken: any) => {
      if (!err) {
        
        req.body.user_id = decodeToken;

        let findSession:any = (await client.get(`${decodeToken}_session`)) ||  (await Sessions.findAll({ where: {userId : decodeToken}}));
        
        console.log(findSession, "sdfwefwe");
        
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