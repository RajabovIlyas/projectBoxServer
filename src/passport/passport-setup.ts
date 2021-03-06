import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import {ISignUp} from '../controllers/Auth/authType';
import {v4 as uuid} from 'uuid';
import {generateToken} from '../utils/authHelper';
import {googleClient, facebookClient, projectUrl} from '../core/app';
import User from '../models/User';

passport.serializeUser((user, done)=> {
  /*
    От пользователя возьмите только идентификатор (чтобы минимизировать размер файла cookie)
    и просто передайте идентификатор пользователя
    к выполненному обратному вызову
    PS: Вам не нужно делать это так, обычно это делается так
    */
  done(null, user);
});

passport.deserializeUser((user:any, done)=> {
  /*
    Вместо пользователя эта функция обычно получает идентификатор
    затем вы используете идентификатор, чтобы выбрать пользователя из базы данных и
    передать объект пользователя в обратный вызов done
    PS: Позже вы можете получить доступ к этим данным по любым маршрутам в: req.user
    */
  done(null, user);
});

passport.use(new passportGoogle.Strategy({
  clientID: googleClient.id,
  clientSecret: googleClient.secret,
  callbackURL: projectUrl+'/api/auth/google/callback',
},
(token, tokenSecret, profile, done)=> {
  done(null, profile);
},
));


passport.use(new passportFacebook.Strategy({
  clientID: facebookClient.id,
  clientSecret: facebookClient.secret,
  callbackURL: projectUrl+'/api/auth/facebook/callback',
  profileFields: ['id', 'email', 'name', 'picture.type(large)'],

},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));
