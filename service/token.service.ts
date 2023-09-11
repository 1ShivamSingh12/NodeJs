import jsonwebtoken from 'jsonwebtoken';

import * as dotenv from 'dotenv'
import { Context } from 'koa';

dotenv.config();

const key: string = <string>process.env.SECRETKEY;


export const generateToken = (id:string , ctx:  Context) =>{
    const token = jsonwebtoken.sign(id, key);
    return token
}