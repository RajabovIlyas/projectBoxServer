import {Router} from 'express';
import user, {upload} from '../../controllers/User/userController';
import middlewares from '../../middlewares/passport';

const router = Router();

router.put('/avatar', middlewares.authMiddleware, upload.single('avatarImage'), user.changeAvatar);

export default router;
