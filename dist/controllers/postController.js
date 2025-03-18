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
exports.deletePostByUser = exports.updatePostByUser = exports.getPostByUser = exports.getPostsByUser = exports.createPostByUser = void 0;
//import { query } from "./../config/db"
// import { User, Post } from "./../types"
const db_1 = require("../config/db");
// CREATE
const createPostByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, userId } = req.body;
    // TODO: När vi har authentiserin gpå plats (JWT) ska vi hämta userId därifrån istället
    try {
        // const userExists = await query<User[]>(
        //     "SELECT * FROM users WHERE id = ?",
        //     [userId]
        // )
        // if(userExists.length === 0) {
        //     res.status(404).json({error: "User not found"})
        //     return;
        // }
        // const result = await query<Post[]>(
        //     "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
        //     [title, content, userId]
        // )
        const result = yield db_1.prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: parseInt(userId)
            }
        });
        if (result) {
            res.status(201).json({ message: "Post created successfully", post: result });
        }
        else {
            res.status(400).json({ error: "Post creation failed" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
});
exports.createPostByUser = createPostByUser;
// READ MANY
const getPostsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    // TODO: ersätt i auth-hantering
    try {
        // const result = await query<Post[]>(
        //     "SELECT * FROM posts WHERE user_id = ?",
        //     [userId]
        // )
        const result = yield db_1.prisma.post.findMany({
            where: {
                authorId: parseInt(userId)
            }
        });
        if (result) {
            res.status(200).json({ message: "Posts fetched successfully", result: result });
        }
        else {
            res.status(404).json({ error: "Posts not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
});
exports.getPostsByUser = getPostsByUser;
// READ ONE
const getPostByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { userId } = req.body; // TODO: ersätt i auth-hantering
    try {
        //   const result = await query<Post[]>(
        //     "SELECT * FROM posts WHERE user_id = ? AND id = ?",
        //     [userId, postId]
        //   )
        const result = yield db_1.prisma.post.findUnique({
            where: {
                id: parseInt(postId),
            }
        });
        if (result) {
            res.status(200).json({ message: "Post fetched successfully", result: result });
        }
        else {
            res.status(404).json({ error: "Post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
});
exports.getPostByUser = getPostByUser;
// UPDATE
const updatePostByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { title, content, userId } = req.body; // TODO: ersätt i auth-hantering
    try {
        // const result = await query<Post[]>(
        //     "UPDATE posts SET title = ?, content = ? WHERE user_id = ? AND id = ?",
        //     [ title, content,  userId, postId]
        // )
        const result = yield db_1.prisma.post.update({
            where: {
                id: parseInt(postId)
            },
            data: {
                title: title,
                content: content
            }
        });
        if (result) {
            res.status(200).json({ message: "Post updated successfully" });
        }
        else {
            res.status(404).json({ error: "Post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
});
exports.updatePostByUser = updatePostByUser;
// DELETE
const deletePostByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { userId } = req.body; // TODO: ersätt i auth-hantering
    try {
        // const result = await query<Post[]>(
        //     "DELETE FROM posts WHERE user_id = ? AND id = ?",
        //     [userId, postId]
        // )
        const result = yield db_1.prisma.post.delete({
            where: {
                id: parseInt(postId)
            }
        });
        if (result) {
            res.status(200).json({ message: "Post deleted successfully" });
        }
        else {
            res.status(404).json({ error: "Post not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
});
exports.deletePostByUser = deletePostByUser;
