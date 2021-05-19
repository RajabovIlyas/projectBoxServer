import bodyParser from 'body-parser';
import express, {Express} from 'express';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PATCH, DELETE, PUT',
  allowedHeaders: 'Content-Type, Authorization',
};


const customizationExpress=(app: Express)=>{
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(require('morgan')('dev'));

  app.use('/uploads', express.static('uploads'));

  app.use(cors({
    origin: '*',
    methods: 'GET, POST, PATCH, DELETE, PUT',
    allowedHeaders: 'Content-Type, Authorization',

  }));

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
