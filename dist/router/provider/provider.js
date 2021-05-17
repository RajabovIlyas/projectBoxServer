"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerController_1 = __importDefault(require("../../controllers/Provider/providerController"));
const router = express_1.Router();
router.post('/', providerController_1.default.create);
exports.default = router;
