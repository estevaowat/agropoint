"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("./app/databases");
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
app.use(routes_1.default);
app.listen(3000, function () {
    console.log('listen in port 3000');
});
