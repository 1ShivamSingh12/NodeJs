"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessions = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Sessions extends sequelize_1.Model {
}
exports.Sessions = Sessions;
Sessions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    sessionId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    deviceType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Sessions",
});
// Users.sync()
//   .then(() => {
//     console.log("Sequelize models synchronized");
//   })
//   .catch((err: Error) => {
//     console.error("Sequelize sync error:", err);
//   });
