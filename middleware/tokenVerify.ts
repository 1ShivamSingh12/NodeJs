import { Response, Request } from "express";
import jwt from "jsonwebtoken";

const secretKey = "shivam";

export const verifyToken = (req: Request, res: Response, next: any) => {
  const tokenToVerify: string = <string>req.headers.authorization;
  console.log(tokenToVerify);
  
  try {
    jwt.verify(tokenToVerify, secretKey, (err: any, decodeToken: any) => {
        req.body.token = decodeToken 
        next()
      });
  } catch (err) {
    console.log(err);
  }
};

export const generateToken = (req: Request, res: Response) => {
  console.log(req.body);

  let payload = {
    username: req.body.email,
  };
  const token = jwt.sign(payload, secretKey);
  res.send(token);
};
