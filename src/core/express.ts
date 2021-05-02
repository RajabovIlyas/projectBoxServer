import bodyParser from 'body-parser';
import {Express} from 'express';

import cookieParser from 'cookie-parser';


const customizationExpress=(app: Express)=>{
  app.use(require('morgan')('dev'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(require('cors')());
};

export default customizationExpress;
