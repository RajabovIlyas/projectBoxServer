import {NextFunction, Request, Response, Router} from 'express';
import Auth from '../controllers/AuthController/authController';
import passport from 'passport';
import middlewares from '../middlewares/passport';
import authGoogle from '../controllers/AuthController/authGoogleController';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../docAPI/swagger.json';

const createRoutes = (app: Router) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.get('/api/auth/google/callback', (req:Request, res:Response, next:NextFunction)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }, passport.authenticate('google', {failureRedirect: '/failed'}), authGoogle.auth);
  app.get('/api/auth/google',(req:Request, res:Response, next:NextFunction)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }, passport.authenticate('google', {scope: ['profile', 'email']}));


  app.post('/api/sign-up', Auth.signUp);
  app.put('/api/authorization/:id', Auth.authorization);
  app.post('/api/log-in', Auth.logIn);
  app.get('/api/auth-me', middlewares.authMiddleware, Auth.authMe);
  app.delete('/api/logout', middlewares.authMiddleware, Auth.logout);

  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default createRoutes;
