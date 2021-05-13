import {NextFunction, Request, Response, Router} from 'express';
import Auth from '../controllers/AuthController/authController';
import passport from 'passport';
import middlewares from '../middlewares/passport';
import authMessenger from '../controllers/AuthController/authMessengerController';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../docAPI/swagger.json';

const createRoutes = (app: Router) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.get('/api/auth/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), authMessenger.authGoogle);
  app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  app.get('/api/auth/facebook', passport.authenticate('facebook'));
  app.get('/api/auth/facebook/callback',
      passport.authenticate('facebook'), authMessenger.authFacebook);


  app.post('/api/sign-up', Auth.signUp);
  app.put('/api/authorization/:id', Auth.authorization);
  app.post('/api/log-in', Auth.logIn);
  app.get('/api/auth-me', middlewares.authMiddleware, Auth.authMe);
  app.delete('/api/logout', middlewares.authMiddleware, Auth.logout);

  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default createRoutes;
