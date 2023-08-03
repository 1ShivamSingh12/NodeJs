"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("../config/db");
const SessionModel_1 = require("../models/SessionModel");
dotenv.config();
const key = process.env.SECRETKEY;
const verifyToken = (req, res, next) => {
    const tokenToVerify = req.headers.authorization;
    console.log(tokenToVerify, 'token');
    try {
        jsonwebtoken_1.default.verify(tokenToVerify, key, (err, decodeToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (!err) {
                req.body.user_id = decodeToken;
                let findSession = (yield db_1.client.get(`${decodeToken}_session`)) || (yield SessionModel_1.Sessions.findOne({ where: { userId: decodeToken } }));
                console.log(findSession, "sdfwefwe");
                if (findSession.length != 0) {
                    next();
                }
                else {
                    res.send("Invalid User");
                }
            }
            else {
                res.send(err);
            }
        }));
    }
    catch (err) {
        console.log(err);
    }
};
exports.verifyToken = verifyToken;
// redis casess
