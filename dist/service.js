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
exports.storeItems = exports.filterItems = exports.tableExistCheck = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
// Function to check if the table exists and create it if it doesn't
const tableExistCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      orderID VARCHAR(255) NOT NULL
    );
  `;
    yield pgConfig_1.default.query(createTableQuery);
    console.log("orders Table created");
});
exports.tableExistCheck = tableExistCheck;
const filterItems = (items) => {
    if (!Array.isArray(items)) {
        throw new Error('Invalid input: items must be an array');
    }
    return items.filter(item => {
        const orderBlocks = item.OrderBlocks;
        if (!Array.isArray(orderBlocks)) {
            return false; // Exclude items with undefined or non-array OrderBlocks
        }
        return !orderBlocks.some(block => {
            const lineNo = block.lineNo;
            if (Array.isArray(lineNo)) {
                return lineNo.some(no => no % 3 === 0);
            }
            else {
                return lineNo % 3 === 0;
            }
        });
    });
};
exports.filterItems = filterItems;
const storeItems = (items) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(items)) {
        throw new Error('Invalid input: items must be an array');
    }
    for (const item of items) {
        yield pgConfig_1.default.query('INSERT INTO orders (orderID) VALUES ($1)', [item.orderID]);
    }
});
exports.storeItems = storeItems;
//# sourceMappingURL=service.js.map