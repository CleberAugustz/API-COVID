"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CovidSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.CovidSchema = new mongoose_1.default.Schema({
    obitos: { type: String },
    positivados: { type: String },
    tratamento: { type: String },
    suspeitos: { type: String },
    recuperados: { type: String },
    descartados: { type: String },
    newObitos: { type: String },
    newPositivados: { type: String },
    newTratamento: { type: String },
    newSuspeitos: { type: String },
    newRecuperados: { type: String },
    newDescartados: { type: String },
    date: { type: Date },
});
var Covid = mongoose_1.default.model("Covid", exports.CovidSchema);
exports.default = Covid;
