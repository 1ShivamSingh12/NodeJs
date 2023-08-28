import { teamData } from "../models/team";
import BaseEntity from "./baseEntity";

export class teamEntity extends BaseEntity{
    constructor() {
        super(teamData);
    }
}

export const TeamEntity = new teamEntity();
