"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
var address_type;
(function (address_type) {
    address_type["HOME"] = "home";
    address_type["WORK"] = "work";
    address_type["DEFAULT"] = "default";
})(address_type || (address_type = {}));
class Address extends sequelize_1.Model {
}
exports.Address = Address;
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    street1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    street2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    landmark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address_type: {
        type: sequelize_1.DataTypes.ENUM(address_type.HOME, address_type.WORK, address_type.DEFAULT),
        allowNull: false,
    },
    zip_code: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Address",
});
