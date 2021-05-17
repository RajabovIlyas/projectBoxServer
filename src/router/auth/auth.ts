import {Router} from 'express';
import passport from 'passport';
import authMessenger from '../../controllers/Auth/authMessengerController';

const router = Router();


router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), authMessenger.authRedirect);
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/facebook', passport.authorize('facebook', {scope: ['email']}));
router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/failed'}), authMessenger.authFacebook);

export default router;
