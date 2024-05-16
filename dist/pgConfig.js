"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    database: 'postgres',
    user: 'postgres',
    password: 'root',
    port: 5432
});
pool.on('connect', () => {
    console.log('Connected to the database');
});
exports.default = pool;
//# sourceMappingURL=pgConfig.js.map