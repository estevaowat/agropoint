var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "cors", "./app/databases", "reflect-metadata", "./routes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express_1 = __importDefault(require("express"));
    var cors_1 = __importDefault(require("cors"));
    require("./app/databases");
    require("reflect-metadata");
    var routes_1 = __importDefault(require("./routes"));
    var app = express_1.default();
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.listen(4000, function () {
        console.log('listen in port 4000');
    });
});
