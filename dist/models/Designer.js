"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerSchema = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
exports.DesignerSchema = new mongoose_1.Schema({
    idUser: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, default: 'Designer' },
    rating: { type: Number, default: 1, min: 1 },
});
User_1.UserSchema.index({ idUser: 1 }, { unique: true });
exports.default = mongoose_1.model('Designer', exports.DesignerSchema);
