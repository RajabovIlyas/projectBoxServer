import {Router} from 'express';
import provider from '../../controllers/Provider/providerController';

const router = Router();

router.post('/', provider.create);

export default router;
