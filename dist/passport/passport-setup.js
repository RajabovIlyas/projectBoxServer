"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const uuid_1 = require("uuid");
const authHelper_1 = require("../utils/authHelper");
const app_1 = require("../core/app");
const User_1 = __importDefault(require("../models/User"));
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
    callbackURL: '/api/auth/google/callback',
}, (token, tokenSecret, profile, done) => {
    var _a, _b;
    // @ts-ignore
    const email = profile.emails[0].value;
    const signUpData = {
        surname: (_a = profile.name) === null || _a === void 0 ? void 0 : _a.familyName,
        name: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.givenName,
        email: email,
        password: uuid_1.v4(),
    };
    User_1.default.findOne({ email: signUpData.email }).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result === null || result === void 0 ? void 0 : result.id) {
            done(null, { token: yield authHelper_1.generateToken(result.id) });
        }
        else {
            User_1.default.create(Object.assign(Object.assign({}, signUpData), { authorization: true }))
                .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result === null || result === void 0 ? void 0 : result.id) {
                    done(null, { token: yield authHelper_1.generateToken(result.id) });
                }
                else {
                    throw 500;
                }
            })).catch((err) => done(err, profile));
        }
    }))
        .catch((err) => done(err, profile));
    // connect()
    //     .then((conn) => {
    //       if (!profile.emails?.values) {
    //         throw 404;
    //       }
    //       conn.query(`SELECT id FROM user WHERE email='${profile?.emails[0]?.value}'`)
    //           .then(async (result)=>{
    //             // @ts-ignore
    //             if (result[0][0]) {
    //               // @ts-ignore
    //               done(null, {token: await generateToken(result[0][0].id)});
    //             } else {
    //               if (!profile.emails?.values) {
    //                 throw 404;
    //               }
    //               const signUpData:ISignUp={
    //                 surname: profile.name?.familyName,
    //                 name: profile.name?.givenName,
    //                 email: profile.emails[0].value,
    //                 id: uuid(),
    //                 password: uuid(),
    //               };
    //               conn.query(`INSERT INTO user (id,name,surname,email,password,authorization) VALUES ('${signUpData.id}', '${signUpData.name}'
    //                     ,'${signUpData.surname}','${signUpData.email}','${signUpData.password}',true)`)
    //                   .then(async (dataStatus) => {
    //                     done(null, {token: await generateToken(signUpData.id)});
    //                   })
    //                   .catch((err) => done(err, undefined));
    //             }
    //             return;
    //           })
    //           .catch((err)=>{
    //             done(err, undefined);
    //           });
    //     }).catch((err)=>{
    //       done(err, undefined);
    //     });
}));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: app_1.facebookClient.id,
    clientSecret: app_1.facebookClient.secret,
    callbackURL: '/api/auth/facebook/callback',
}, (accessToken, refreshToken, profile, cb) => {
    console.log(JSON.stringify(profile));
    return cb(null, profile);
}));
