"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authMessengerController_1 = __importDefault(require("../../controllers/Auth/authMessengerController"));
const router = express_1.Router();
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/failed' }), authMessengerController_1.default.authRedirect);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/facebook', passport_1.default.authorize('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/failed' }), authMessengerController_1.default.authFacebook);
exports.default = router;
