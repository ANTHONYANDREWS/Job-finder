import {Router} from 'express';
import Job from '../models/job.js'
import restify from 'express-restify-mongoose';
import verifyToken from '../middlewares/auth.js';

const router = Router();

restify.serve(router, Job, {
    preMiddleware: [verifyToken]
})


export default router;
