"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PositionController_1 = __importDefault(require("./app/controllers/PositionController"));
var routes = express_1.Router();
var positionController = new PositionController_1.default();
routes.post('/', positionController.create);
exports.default = routes;