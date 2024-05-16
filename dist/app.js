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
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/items/process', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = req.body.items;
    //   if (!Array.isArray(items)) {
    //     return res.status(400).json({ message: 'Invalid input format: items must be an array' });
    //   }
    try {
        const filteredItems = (0, service_1.filterItems)(items);
        yield (0, service_1.tableExistCheck)();
        yield (0, service_1.storeItems)(filteredItems);
        res.status(201).json({ message: 'Filtered items processed and stored in the database', filteredItems });
    }
    catch (error) {
        console.error('Error processing items:', error.message);
        res.status(500).json({ message: 'An error occurred while processing items' });
    }
}));
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=app.js.map