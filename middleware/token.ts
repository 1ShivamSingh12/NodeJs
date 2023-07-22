import { Response, Request } from "express";
import { createClient } from "redis";
import jwt from "jsonwebtoken";
import { SessionData } from "../models/session";

const secretKey = "qwetygjkvuyfy";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

export const verifyToken = (req: Request, res: Response, next: any) => {
  const tokenToVerify: string = <string>req.headers.authorization;
  console.log(tokenToVerify);

  try {
    jwt.verify(tokenToVerify, secretKey, async (err: any, decodeToken: any) => {
      if (!err) {
        req.body.user_id = decodeToken;
        next();
        // await client.connect();

        // let findSession: any = (await client.get(`${decodeToken.id}_session`)) ||  (await SessionData.find({ user_id: decodeToken.id }));
        // console.log(JSON.parse(findSession).user_id, "sdfwefwe");

        // if (findSession.length != 0) {
        //   next();
        // } else {
        //   res.send("Invalid User");
        // }
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const generateToken = async (req: Request, res: Response) => {
  // await client.connect();

  const token = jwt.sign(req.body.id, secretKey);

  let session_payload: object = {
    user_id: req.body.id,
    device_id: "1234",
    device_type: "Goggle Chrome",
  };

  // await SessionData.insertMany([session_payload]);

  // let result = await client.set(`${req.body.id}_session`,JSON.stringify(session_payload));

  // let result1 = await client.get(`${req.body.id}_session`);

  // console.log(result1);

  res.send(token);
};


// redis casess