var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./app/controllers/PositionController"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express_1 = require("express");
    var PositionController_1 = __importDefault(require("./app/controllers/PositionController"));
    var routes = express_1.Router();
    var positionController = new PositionController_1.default();
    routes.get('/paths', positionController.index);
    routes.post('/positions', positionController.get);
    routes.post('/', positionController.create);
    exports.default = routes;
});
