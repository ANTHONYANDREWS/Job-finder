import {Router} from 'express';
import {registerUser, loginUser} from '../controller/user.js';

const router = Router();

router.post('/login', loginUser);

export { router as userRoutes };