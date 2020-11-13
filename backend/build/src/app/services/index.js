"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const typeorm_1 = require("typeorm");
const node_fetch_1 = __importDefault(require("node-fetch"));
const position_1 = __importDefault(require("../models/position"));
class Services {
    constructor() {
        this.entityManager = typeorm_1.getManager();
    }
    findAllCsvImported() {
        return __awaiter(this, void 0, void 0, function* () {
            const paths = yield this.entityManager.createQueryBuilder(position_1.default, 'positions')
                .select('path')
                .distinct(true)
                .getRawMany();
            return paths;
        });
    }
    findPositionsByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('url', url);
            const positions = yield this.entityManager.find(position_1.default, {
                path: url
            });
            console.log(positions);
            return positions;
        });
    }
    saveCsvIntoDatabase({ url }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield node_fetch_1.default(url);
            const { body } = response;
            const positions = [];
            return new Promise((res, rej) => {
                body.pipe(csv_parser_1.default({
                    headers: ['latitude', 'longitude'],
                    skipLines: 1,
                    mapValues: (data) => {
                        const { value } = data;
                        return Number(value);
                    }
                })).on('error', (error) => rej(error))
                    .on('data', (data) => {
                    positions.push(Object.assign(Object.assign({}, data), { path: url }));
                }).on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const positionsToSave = this.entityManager.create(position_1.default, positions);
                    yield this.entityManager.save(positionsToSave);
                    res(positionsToSave);
                }));
            });
        });
    }
}
exports.default = Services;
