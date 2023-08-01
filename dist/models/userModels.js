"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const productModel_1 = require("./productModel");
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["Active"] = "active";
    StatusEnum["Inactive"] = "inactive";
})(StatusEnum || (StatusEnum = {}));
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    first_Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(StatusEnum.Active, StatusEnum.Inactive),
        allowNull: false,
    },
    profilePic: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Users",
});
Users.hasMany(productModel_1.Products, { foreignKey: "owner_id", as: "owner" });
productModel_1.Products.belongsTo(Users, { foreignKey: "owner_id", as: "owner" });
Users.hasMany(productModel_1.Products, { foreignKey: "bidder_id", as: "bidderProducts" });
productModel_1.Products.belongsTo(Users, { foreignKey: "bidder_id", as: "bidder" });
