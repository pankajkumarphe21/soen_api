import express from 'express';
import {createUserController, loginUserController, logoutController, profileController} from '../controllers/user.controller.js'
import {body} from 'express-validator';
import {authUser} from '../middleware/auth.middleware.js'

const router=express.Router();

router.post('/register',body('email').isEmail().withMessage('Email must be valid')
,body('password').isLength({min:3}).withMessage('Password must be atleast 3 characters long.'),
createUserController);

router.post('/login',body('email').isEmail().withMessage('Email must be valid')
,body('password').isLength({min:3}).withMessage('Password must be atleast 3 characters long.'),
loginUserController);

router.get('/profile',authUser,profileController);

router.get('/logout',authUser,logoutController);

export default router;