import {Request, Response, Router} from 'express';
import Auth from '../controllers/Auth/authController';
import middlewares from '../middlewares/passport';
import agent from './agent/agent';
import designer from './designer/designer';
import course from './course/course';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../docAPI/swagger.json';
import Token from '../models/Token';
import auth from './auth/auth';
import provider from './provider/provider';
import user from './user/user';


const router = Router();


router.post('/sign-up', Auth.signUp);
router.put('/authorization/:id', Auth.authorization);
router.post('/log-in', Auth.logIn);
router.get('/auth-me', middlewares.authMiddleware, Auth.authMe);
router.delete('/logout', middlewares.authMiddleware, Auth.logout);

router.use('/auth', auth);
router.use('/provider', provider);
router.use('/course', course);
router.use('/agent', agent);
router.use('/designer', designer);
router.use('/user', user);


router.delete('/token', (req:Request, res: Response)=>{
  // @ts-ignore
  Token.deleteMany().exec()
      .then((result)=>res.status(200).json({}))
      .catch((err)=>res.status(500).json({}));
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
