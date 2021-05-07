import express from 'express';
import {PORT, MONGO_URI} from './core/app';
import customizationExpress from './core/express';
import createRoutes from './core/routes';
import mongoose from 'mongoose';

require('./passport/passport-setup');


const app = express();


customizationExpress(app);
createRoutes(app);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
  });
}).
    catch((err) => console.log(err));
