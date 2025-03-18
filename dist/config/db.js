"use strict";
// import mysql from "mysql2/promise"
// import dotenv from "dotenv"
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// dotenv.config();
// // Uppkoppling mot databasen
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: parseInt(process.env.DB_PORT || "8889")
//   });
// // Helper function
// async function query<T>(sql:string, params: any[]) {
//     const [ result] = await pool.execute(sql, params)
//    return result as T;
// }
// export { query };
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
