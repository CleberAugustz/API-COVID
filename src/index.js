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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var scrapping_1 = __importDefault(require("./service/scrapping"));
require("./database");
var node_cron_1 = __importDefault(require("node-cron"));
var express_1 = __importDefault(require("express"));
var Covid_1 = __importDefault(require("./models/Covid"));
var cors_1 = __importDefault(require("cors"));
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get("/dados", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var retorno, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Covid_1.default.findOne({}).sort({ field: "asc", date: -1 })];
            case 1:
                retorno = _a.sent();
                return [2 /*return*/, res.status(200).json(retorno)];
            case 2:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(error_1.status)];
            case 3: return [2 /*return*/];
        }
    });
}); });
function main(cond) {
    return __awaiter(this, void 0, void 0, function () {
        var scrapping, date, day_1, month_1, year_1, url, html, $_1, body, link_1, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    scrapping = new scrapping_1.default();
                    date = new Date();
                    day_1 = date.getDate();
                    month_1 = date.getMonth() + 1;
                    year_1 = date.getFullYear();
                    url = process.env.URL_PORTAL || "";
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    html = _a.sent();
                    $_1 = cheerio_1.default.load(html.data);
                    body = $_1("body").find("div[id='imagenet-principais'] > a");
                    body.each(function (idx, el) { return __awaiter(_this, void 0, void 0, function () {
                        var dados, comparedDay, comparedMonth;
                        return __generator(this, function (_a) {
                            dados = $_1(el).attr("href");
                            comparedDay = day_1 < 10 ? "0" + day_1 : day_1;
                            comparedMonth = month_1 < 10 ? "0" + month_1 : month_1;
                            if ((dados === null || dados === void 0 ? void 0 : dados.indexOf("coronavirus+" + comparedDay + "+" + comparedMonth + "+" + year_1)) != -1) {
                                link_1 = dados;
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    console.log("It's Working");
                    if (!process.env.URL_PORTAL) return [3 /*break*/, 3];
                    return [4 /*yield*/, scrapping.execute("http://www.piracicaba.sp.gov.br/" + link_1, cond, "PortalPiracicaba", new Date(year_1, month_1 - 1, day_1))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
node_cron_1.default.schedule("00 53 19 * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Update");
                return [4 /*yield*/, main(false)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, {
    scheduled: true,
    timezone: "America/Sao_Paulo",
});
app.listen(process.env.PORT || 3333, function () {
    console.log("Online");
});
