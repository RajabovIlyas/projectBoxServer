import {Router} from 'express';
import course from '../../controllers/Course/courseController';

const router = Router();

router.post('/', course.create);

export default router;
