"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// TODO: importera controller-funktioner
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// CRUD för en resurs users
router.post("/", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 8 }), userController_1.createUser);
router.get("/", userController_1.getUsers);
router.get("/:id", userController_1.getUser);
router.put("/:id", userController_1.updateUser);
router.delete("/:id", userController_1.deleteUser);
exports.default = router;
