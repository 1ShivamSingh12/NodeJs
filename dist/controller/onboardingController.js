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
exports.deleteProfile = exports.logOut = exports.getProfile = exports.forgetPassword = exports.addAddress = exports.updateProfile = exports.loginUser = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const onboardingValidation_1 = require("../validation/onboardingValidation");
const addressModel_1 = require("../models/addressModel");
const userModels_1 = require("../models/userModels");
const tokenGeneration_1 = require("../service/tokenGeneration");
const SessionModel_1 = require("../models/SessionModel");
const db_1 = require("../config/db");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let securePass = yield bcrypt_1.default.hash(req.body.password, 10);
        req.body.password = securePass;
        let payload = Object.assign(Object.assign({}, req.body), { status: "active" });
        const user = yield userModels_1.Users.create(payload);
        res.send(user);
    }
    catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).send({ message: "Error inserting user" });
    }
});
exports.signUp = signUp;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (email && password) {
            const [user, a] = yield userModels_1.Users.findAll({
                where: {
                    email: email,
                },
            });
            const matchPass = yield bcrypt_1.default.compare(req.body.password, user.dataValues.password);
            if (matchPass) {
                req.body.id = user.dataValues.id;
                (0, tokenGeneration_1.generateToken)(req, res);
            }
            else {
                res.send("Password is incorrect");
            }
        }
        else {
            return "Please provide both Email and Password";
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            const error = yield onboardingValidation_1.updateProfileSchema.validateAsync(req.body);
            if (!error) {
                res.send(error);
            }
            else {
                const updateData = yield userModels_1.Users.update(req.body, { where: { id: req.body.user_id } });
                res.send("Updated");
            }
        }
        else {
            throw new Error("No data provided");
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.updateProfile = updateProfile;
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const error = onboardingValidation_1.addressSchema.validateAsync(req.body);
        if (req.body && !error) {
            console.log(req.body);
            let payload = Object.assign(Object.assign({}, req.body), { user_id: req.body.user_id });
            console.log(addressModel_1.Address, userModels_1.Users);
            let result = yield addressModel_1.Address.create(payload);
            console.log(result);
            if (result) {
                res.status(200).send("Address inserted");
            }
            else {
                res.send("Not inserted");
            }
        }
        else {
            res.send(error);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addAddress = addAddress;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = onboardingValidation_1.forgetPasswordSchema.validateAsync(req.body);
    try {
        if (req.body && !error) {
            if (req.body.newPassword == req.body.confirmPassword) {
                let securePass = yield bcrypt_1.default.hash(req.body.newPassword, 10);
                const updateData = yield userModels_1.Users.update({ password: securePass }, { where: { id: req.body.user_id } });
                res.send("Changed");
            }
            else {
                res.send("Password do not match");
            }
        }
        else {
            res.send(error);
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.forgetPassword = forgetPassword;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let profile = yield userModels_1.Users.findByPk(req.body.user_id);
    res.send(profile);
});
exports.getProfile = getProfile;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            let result = yield SessionModel_1.Sessions.destroy({
                where: { user_id: req.body.user_id },
            });
            let redisUpdate = yield db_1.client.DEL(`${req.body.user_id}_session`);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.logOut = logOut;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_del = yield userModels_1.Users.destroy({
            where: {
                id: req.body.user_id,
            },
        });
        let session_Del = yield SessionModel_1.Sessions.destroy({
            where: {
                user_id: req.body.user_id,
            },
        });
        let redis_Del = yield db_1.client.del(`${req.body.user_id}_session`);
        if (user_del && session_Del && redis_Del) {
            res.status(200).send("User deleted Successfully.");
        }
        else {
            res.status(500).send("Error");
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.deleteProfile = deleteProfile;
