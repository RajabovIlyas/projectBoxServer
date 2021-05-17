import {Router} from 'express';
import designer from '../../controllers/Designer/designerController';

const router = Router();

router.post('/', designer.create);

export default router;
