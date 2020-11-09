"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv_parser_1 = __importDefault(require("csv-parser"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var Csv = /** @class */ (function () {
    function Csv() {
        this.results = [];
    }
    Csv.prototype.parse = function () {
        var _this = this;
        var samplePath = path_1.default.join(__dirname, 'sample.csv');
        fs_1.default.createReadStream(samplePath)
            .pipe(csv_parser_1.default(['latitude', 'longitude']))
            .on('data', function (data) { return _this.results.push(data); })
            .on('end', function () {
            console.log(_this.results);
        });
        return this.results;
    };
    return Csv;
}());
exports.default = new Csv();
