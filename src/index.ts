import express, {Request, Response} from 'express';
import {PORT, MONGO_URI} from './core/app';
import customizationExpress from './core/express';
import createRoutes from './router/routes';
import mongoose from 'mongoose';
import router from "./router/routes";

require('./passport/passport-setup');


const app = express();


customizationExpress(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api', createRoutes);

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
