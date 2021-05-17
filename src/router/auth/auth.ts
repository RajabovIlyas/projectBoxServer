import {Router} from 'express';
import passport from 'passport';
import authMessenger from '../../controllers/Auth/authMessengerController';

const router = Router();


router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), authMessenger.authGoogle);
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
    passport.authenticate('facebook', {scope: ['email']}), authMessenger.authFacebook);

export default router;
