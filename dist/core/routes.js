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
const authController_1 = __importDefault(require("../controllers/AuthController/authController"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../middlewares/passport"));
const authMessengerController_1 = __importDefault(require("../controllers/AuthController/authMessengerController"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../docAPI/swagger.json"));
const createRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    app.get('/api/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/failed' }), authMessengerController_1.default.authGoogle);
    app.get('/api/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/api/auth/facebook', passport_1.default.authenticate('facebook'));
    app.get('/api/auth/facebook/callback', passport_1.default.authenticate('facebook'), authMessengerController_1.default.authFacebook);
    app.post('/api/sign-up', authController_1.default.signUp);
    app.put('/api/authorization/:id', authController_1.default.authorization);
    app.post('/api/log-in', authController_1.default.logIn);
    app.get('/api/auth-me', passport_2.default.authMiddleware, authController_1.default.authMe);
    app.delete('/api/logout', passport_2.default.authMiddleware, authController_1.default.logout);
    app.use('/api', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
};
exports.default = createRoutes;
