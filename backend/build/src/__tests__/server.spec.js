"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_1 = __importDefault(require("../app/services/csv"));
describe('CSV Parsing', () => {
    it('should parse value into array', () => {
        const parsed = csv_1.default.parse();
        console.log(parsed);
    });
});
