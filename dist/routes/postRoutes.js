"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
// CRUD för en resurs posts
router.post("/", postController_1.createPostByUser);
router.get("/", postController_1.getPostsByUser);
router.get("/:postId", postController_1.getPostByUser);
router.put("/:postId", postController_1.updatePostByUser);
router.delete("/:postId", postController_1.deletePostByUser);
exports.default = router;
