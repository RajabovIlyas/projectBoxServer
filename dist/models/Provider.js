"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderSchema = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
exports.ProviderSchema = new mongoose_1.Schema({
    nameCompany: { type: String, required: true },
    fullName: { type: String, required: true },
    position: { type: String, required: true },
    companyDescription: { type: String, required: true },
    bestProducts: { type: String, required: true },
    siteCompany: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
});
User_1.UserSchema.index({ idUser: 1 }, { unique: true });
exports.default = mongoose_1.model('Provider', exports.ProviderSchema);
