import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import * as dotenv from "dotenv";
import { Sessions } from "../models/SessionModel";
import { client } from "../config/db";

dotenv.config();

const key: string = <string>process.env.SECRETKEY;

export const generateToken = async (req: Request, res: Response) => {
 

  const token = jwt.sign(req.body.id, key);

  let session_payload = {
    user_id: req.body.id,
    sessionId: "5311j2jh",
    deviceType: "Goggle Chrome",
  };

  let user_exist = await Sessions.findAll({
    where: {
      user_id: req.body.id,
    },
  });

  res.send(token);
  try {
    if (user_exist[0] == undefined) {
      let data: Sessions = await Sessions.create(session_payload);
      console.log(data);

      let result = await client.set(`${req.body.id}_session`,JSON.stringify(session_payload)
      );

      let result1 = await client.get(`${req.body.id}_session`);

      console.log(result1, "redis");
    } else {
      res.send("Already Exist");
    }
  } catch (error) {
    console.log(error);
  }
};
