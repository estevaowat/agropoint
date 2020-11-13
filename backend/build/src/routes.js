"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PositionController_1 = __importDefault(require("./app/controllers/PositionController"));
const routes = express_1.Router();
const positionController = new PositionController_1.default();
routes.get('/paths', positionController.index);
routes.post('/positions', positionController.get);
routes.post('/', positionController.create);
exports.default = routes;
