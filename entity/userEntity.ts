import { Model } from "mongoose";
import { userData } from "../models/userModel";
import BaseEntity from "./baseEntity";

export class userEntity extends BaseEntity{
    constructor() {
        super(userData);
    }
}

export const UserEntity = new userEntity();
