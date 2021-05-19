"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/Auth/authController"));
const passport_1 = __importDefault(require("../middlewares/passport"));
const agent_1 = __importDefault(require("./agent/agent"));
const designer_1 = __importDefault(require("./designer/designer"));
const course_1 = __importDefault(require("./course/course"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../docAPI/swagger.json"));
const Token_1 = __importDefault(require("../models/Token"));
const auth_1 = __importDefault(require("./auth/auth"));
const provider_1 = __importDefault(require("./provider/provider"));
const user_1 = __importDefault(require("./user/user"));
const router = express_1.Router();
router.post('/sign-up', authController_1.default.signUp);
router.put('/authorization/:id', authController_1.default.authorization);
router.post('/log-in', authController_1.default.logIn);
router.get('/auth-me', passport_1.default.authMiddleware, authController_1.default.authMe);
router.delete('/logout', passport_1.default.authMiddleware, authController_1.default.logout);
router.use('/auth', auth_1.default);
router.use('/provider', provider_1.default);
router.use('/course', course_1.default);
router.use('/agent', agent_1.default);
router.use('/designer', designer_1.default);
router.use('/user', user_1.default);
router.delete('/token', (req, res) => {
    // @ts-ignore
    Token_1.default.deleteMany().exec()
        .then((result) => res.status(200).json({}))
        .catch((err) => res.status(500).json({}));
});
router.use('/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
exports.default = router;
