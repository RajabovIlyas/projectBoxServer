"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    authorization: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://projectbox-pro-server.herokuapp.com/uploads/default.jpg' },
});
exports.UserSchema.index({ email: 1 }, { unique: true });
exports.UserSchema.pre('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    // generate a salt
    bcryptjs_1.default.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcryptjs_1.default.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
exports.default = mongoose_1.model('User', exports.UserSchema);
