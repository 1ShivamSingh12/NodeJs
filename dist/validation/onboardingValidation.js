"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductSchema = exports.forgetPasswordSchema = exports.addressSchema = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    first_Name: joi_1.default.string().trim().min(3).max(50).required(),
    last_Name: joi_1.default.string().trim().min(3).max(50).required(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi_1.default.string().token().min(5).max(30).required(),
    profilePic: joi_1.default.binary().required(),
    phone_number: joi_1.default.string().max(10).required(),
    gender: joi_1.default.string().valid("Male", "Female", "other").required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: joi_1.default.string().token().min(5).max(30).required(),
});
exports.updateProfileSchema = joi_1.default.object({
    first_Name: joi_1.default.string().trim().min(3).max(50).optional(),
    last_Name: joi_1.default.string().trim().min(3).max(50).optional(),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    profilePic: joi_1.default.binary().optional(),
    phone_number: joi_1.default.string().max(10).optional(),
    gender: joi_1.default.string().valid("Male", "Female", "other").optional(),
});
exports.addressSchema = joi_1.default.object({
    street1: joi_1.default.string().alphanum().trim().min(3).max(50).required(),
    street2: joi_1.default.string().alphanum().trim().min(3).max(50).required(),
    landmark: joi_1.default.string().regex(/^[A-Za-z]+$/).trim().min(3).max(50).required(),
    city: joi_1.default.string().regex(/^[A-Za-z]+$/).trim().min(3).max(50).required(),
    state: joi_1.default.string().regex(/^[A-Za-z]+$/).trim().min(3).max(50).required(),
    address_type: joi_1.default.string().valid("home", "work", "default").required(),
    zip_code: joi_1.default.number().max(6).required(),
});
exports.forgetPasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string().token().min(5).max(30).required(),
    confirmPassword: joi_1.default.string().token().min(5).max(30).required(),
});
exports.addProductSchema = joi_1.default.object({
    name: joi_1.default.string().alphanum().max(30).required(),
    description: joi_1.default.string().alphanum().min(5).max(100).required(),
    price: joi_1.default.number().required().max(10)
});
