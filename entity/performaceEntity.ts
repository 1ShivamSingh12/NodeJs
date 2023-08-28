
import { performanceData } from "../models/performance";

import BaseEntity from "./baseEntity";

export class performanceEntity extends BaseEntity{
    constructor() {
        super(performanceData);
    }
}

export const PerformanceEntity = new performanceEntity();
