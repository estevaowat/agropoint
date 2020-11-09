"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv_1 = __importDefault(require("../app/services/csv"));
describe('CSV Parsing', function () {
    it('should parse value into array', function () {
        var parsed = csv_1.default.parse();
        console.log(parsed);
    });
});
