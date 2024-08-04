import {Router} from 'express';
import Job from '../models/job.js'
import restify from 'express-restify-mongoose';
import verifyToken from '../middlewares/auth.js';
import User from '../models/user.js';

const router = Router();


function jobValidater(req, res, next) {
    if (req && req.query && req.query.role === "employer") {
        req.query.query = JSON.stringify(req.query);
        const {memberId} = req.params;
        return Job.find({employer: memberId})
        .then((data) => {
            return res.send(data);
        })
        .catch(err => {
            return next(err);
        })
    }
    return next();
}
restify.serve(router, User, {})
restify.serve(router, Job, {
    preMiddleware: [verifyToken],
    preRead: [jobValidater]
})


export default router;
