import bodyParser from 'body-parser';
import {Express} from 'express';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';


const customizationExpress=(app: Express)=>{
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(require('morgan')('dev'));

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
