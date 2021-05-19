"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const app_1 = require("../core/app");
passport_1.default.serializeUser((user, done) => {
    /*
      От пользователя возьмите только идентификатор (чтобы минимизировать размер файла cookie)
      и просто передайте идентификатор пользователя
      к выполненному обратному вызову
      PS: Вам не нужно делать это так, обычно это делается так
      */
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    /*
      Вместо пользователя эта функция обычно получает идентификатор
      затем вы используете идентификатор, чтобы выбрать пользователя из базы данных и
      передать объект пользователя в обратный вызов done
      PS: Позже вы можете получить доступ к этим данным по любым маршрутам в: req.user
      */
    done(null, user);
});
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    clientID: app_1.googleClient.id,
    clientSecret: app_1.googleClient.secret,
    callbackURL: app_1.projectUrl + '/api/auth/google/callback',
}, (token, tokenSecret, profile, done) => {
    done(null, profile);
}));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: app_1.facebookClient.id,
    clientSecret: app_1.facebookClient.secret,
    callbackURL: app_1.projectUrl + '/api/auth/facebook/callback',
    profileFields: ['id', 'email', 'name', 'picture.type(large)'],
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));
