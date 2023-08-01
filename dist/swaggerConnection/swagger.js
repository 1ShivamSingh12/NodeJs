"use strict";
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
exports.swaggerDoc = exports.client = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
exports.client = (0, redis_1.createClient)();
exports.client.on("error", (err) => console.log("Redis Client Error", err));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "olx API Docs",
            version: "1.0.0",
        },
        schemas: ["http", "https"],
        servers: [
            {
                url: "http://localhost:7000/",
            },
        ],
    },
    apis: ["./routes/onboardingRoutes.ts", "./routes/productRoutes.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(options);
const swaggerDoc = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
        yield exports.client.connect();
        console.log(`swagger running at http://localhost:7000/api`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.swaggerDoc = swaggerDoc;
