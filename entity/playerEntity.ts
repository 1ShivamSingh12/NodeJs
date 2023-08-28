import { playerData } from "../models/playerModel";
import { userData } from "../models/userModel";
import BaseEntity from "./baseEntity";

export class playerEntity extends BaseEntity{
    constructor() {
        super(playerData);
    }
}

export const PlayerEntity = new playerEntity();
