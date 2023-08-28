import { matchData } from "../models/matchModel";

import BaseEntity from "./baseEntity";

export class matchEntity extends BaseEntity{
    constructor() {
        super(matchData);
    }
}

export const MatchEntity = new matchEntity();
