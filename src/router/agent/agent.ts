import {Router} from 'express';
import agent from '../../controllers/Agent/agentController';

const router = Router();

router.post('/', agent.create);

export default router;
