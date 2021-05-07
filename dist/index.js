"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./core/app");
const express_2 = __importDefault(require("./core/express"));
const routes_1 = __importDefault(require("./core/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
require('./passport/passport-setup');
const app = express_1.default();
express_2.default(app);
routes_1.default(app);
mongoose_1.default.connect(app_1.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(app_1.PORT, () => {
        console.log(`Server started: http://localhost:${app_1.PORT}`);
    });
}).
    catch((err) => console.log(err));
