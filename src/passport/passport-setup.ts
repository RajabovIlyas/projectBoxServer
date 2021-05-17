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
  // @ts-ignore
  const email=profile.emails[0].value;
  const signUpData:ISignUp={
    surname: profile.name?.familyName,
    name: profile.name?.givenName,
    email: email,
    password: uuid(),
  };
  User.findOne({email: signUpData.email}).exec()
      .then(async (result)=>{
        if (result?.id) {
          done(null, {token: await generateToken(result.id)});
        } else {
          User.create({...signUpData, authorization: true})
              .then(async (result)=>{
                if (result?.id) {
                  done(null, {token: await generateToken(result.id)});
                } else {
                  throw 500;
                }
              }).catch((err)=> done(err, profile));
        }
      })
      .catch((err)=> done(err, profile));
},
));


passport.use(new passportFacebook.Strategy({
  clientID: facebookClient.id,
  clientSecret: facebookClient.secret,
  callbackURL: projectUrl+'/api/auth/facebook/callback',
  profileFields: ['id', 'email', 'name'],

},
(accessToken, refreshToken, profile, done) => {
  // @ts-ignore


  const fullName:{givenName:string, familyName:string}=profile.user.name;
  // @ts-ignore
  const email=profile.emails[0].value;
  const signUpData:ISignUp={
    surname: fullName.familyName,
    name: fullName.givenName,
    email: email,
    password: uuid(),
  };
  // console.log('ilyas', signUpData);
  // User.findOne({email: signUpData.email}).exec()
  //     .then(async (result)=>{
  //       if (result?.id) {
  //         done(null, {token: await generateToken(result.id)});
  //       } else {
  //         User.create({...signUpData, authorization: true})
  //             .then(async (result)=>{
  //               if (result?.id) {
  //                 done(null, {token: await generateToken(result.id)});
  //               } else {
  //                 throw 500;
  //               }
  //             }).catch((err)=> done(err, profile));
  //       }
  //     })
  //     .catch((err)=> done(err, profile));

  done(null, signUpData);
}));
