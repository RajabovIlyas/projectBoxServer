"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const designerController_1 = __importDefault(require("../../controllers/Designer/designerController"));
const router = express_1.Router();
router.post('/', designerController_1.default.create);
exports.default = router;
