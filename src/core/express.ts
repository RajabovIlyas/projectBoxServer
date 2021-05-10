import bodyParser from 'body-parser';
import {Express} from 'express';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';

const corsOptions = {
  происхождение: ' http://example.com ',
  optionsSuccessStatus: 200, //  некоторые устаревшие браузеры (IE11, различные SmartTV) задыхаются от 204
};


const customizationExpress=(app: Express)=>{
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(require('morgan')('dev'));
  app.use(require('cors')(corsOptions));

  app.use(bodyParser.json());
  app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2'],
  }));

  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());
};

export default customizationExpress;
