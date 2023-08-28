import { match_Summary } from "../models/matchSummary";

import BaseEntity from "./baseEntity";

export class matchSummaryEntity extends BaseEntity{
    constructor() {
        super(match_Summary);
    }
}

export const MatchSummaryEntity = new matchSummaryEntity();
