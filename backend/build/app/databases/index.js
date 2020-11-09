"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_config_1 = __importDefault(require("../config/database.config"));
var position_1 = __importDefault(require("../models/position"));
var models = [position_1.default];
var Database = /** @class */ (function () {
    function Database() {
        var _this = this;
        this.connection = new sequelize_1.Sequelize(database_config_1.default);
        models.map(function (model) { return model.init(_this.connection); });
    }
    return Database;
}());
exports.default = new Database();
