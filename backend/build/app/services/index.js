var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "csv-parser", "typeorm", "node-fetch", "../models/position"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var csv_parser_1 = __importDefault(require("csv-parser"));
    var typeorm_1 = require("typeorm");
    var node_fetch_1 = __importDefault(require("node-fetch"));
    var position_1 = __importDefault(require("../models/position"));
    var Services = /** @class */ (function () {
        function Services() {
            this.entityManager = typeorm_1.getManager();
        }
        Services.prototype.findAllCsvImported = function () {
            return __awaiter(this, void 0, void 0, function () {
                var paths;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.entityManager.createQueryBuilder(position_1.default, 'positions')
                                .select('path')
                                .distinct(true)
                                .getRawMany()];
                        case 1:
                            paths = _a.sent();
                            return [2 /*return*/, paths];
                    }
                });
            });
        };
        Services.prototype.findPositionsByUrl = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var positions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('url', url);
                            return [4 /*yield*/, this.entityManager.find(position_1.default, {
                                    path: url
                                })];
                        case 1:
                            positions = _a.sent();
                            console.log(positions);
                            return [2 /*return*/, positions];
                    }
                });
            });
        };
        Services.prototype.saveCsvIntoDatabase = function (_a) {
            var url = _a.url;
            return __awaiter(this, void 0, void 0, function () {
                var response, body, positions;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, node_fetch_1.default(url)];
                        case 1:
                            response = _b.sent();
                            body = response.body;
                            positions = [];
                            return [2 /*return*/, new Promise(function (res, rej) {
                                    body.pipe(csv_parser_1.default({
                                        headers: ['latitude', 'longitude'],
                                        skipLines: 1,
                                        mapValues: function (data) {
                                            var value = data.value;
                                            return Number(value);
                                        }
                                    })).on('error', function (error) { return rej(error); })
                                        .on('data', function (data) {
                                        positions.push(__assign(__assign({}, data), { path: url }));
                                    }).on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                                        var positionsToSave;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    positionsToSave = this.entityManager.create(position_1.default, positions);
                                                    return [4 /*yield*/, this.entityManager.save(positionsToSave)];
                                                case 1:
                                                    _a.sent();
                                                    res(positionsToSave);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                })];
                    }
                });
            });
        };
        return Services;
    }());
    exports.default = Services;
});
