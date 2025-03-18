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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = void 0;
//import { query } from "../config/db"
//import { User } from "../types";
const db_1 = require("../config/db");
const express_validator_1 = require("express-validator");
// CREATE
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     res.status(400).json({errors: errors.array()});
    //     return;
    // }
    // TODO: No user duplicate?
    try {
        // const result = await query<User[]>(
        //     "INSERT INTO users (username, password) VALUES (?, ?)",
        //     [username, password]
        // );
        // // TODO: Kolla på result.affectedRows om den är true
        // res.status(201).json({message: "User created successfully"});
        // TODO: Write CRUD with prisma
        // https://www.prisma.io/docs/orm/prisma-client/queries/crud
        const result = yield db_1.prisma.user.create({
            data: {
                email: email,
                password: password
            }
        });
        if (result) {
            res.status(201).json({ message: "User created successfully", user: result });
        }
        else {
            res.status(400).json({ error: "User creation failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createUser = createUser;
// READ ONE
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hämta url-parameter
    const { id } = req.params;
    try {
        // const result = await query<User[]>(
        //     "SELECT * FROM users WHERE id = ?",
        //     [id]
        //   );
        //   // TODO: Om användaren inte hittas
        const result = yield db_1.prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (result) {
            res.status(200).json({ message: "User fetched successfuly", user: result });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUser = getUser;
// READ MANY
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    //const sortBy = req.query.sortBy || "email";
    const sortOrder = req.query.sortOrder || "desc";
    try {
        // const result = await query<User[]>(
        //     "SELECT * FROM users",
        //     []
        //   );
        const result = yield db_1.prisma.user.findMany({
            skip: page * limit,
            take: limit,
            orderBy: {
                email: sortOrder
            }
        });
        if (result) {
            res.status(200).json({ message: "Users fetched successfully", user: result });
        }
        else {
            res.status(404).json({ error: "Users not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUsers = getUsers;
// UPDATE 
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // URL-parameter
    const { email, password } = req.body; // Data som skickas via body (som i formulär)
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const result = yield db_1.prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email: email,
                password: password
            }
        });
        if (result) {
            res.status(200).json({ message: "User updated successfuly" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUser = updateUser;
// DELETE
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // const result = await query<void> (
        //     "DELETE FROM users WHERE id = ?",
        //     [id]
        //   );
        // TODO: Om användaren inte hittas
        const result = yield db_1.prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
