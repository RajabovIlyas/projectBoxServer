"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CourseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    orderNumber: { type: String, required: true },
});
exports.default = mongoose_1.model('Course', exports.CourseSchema);
