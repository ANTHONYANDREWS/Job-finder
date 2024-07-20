import {Router} from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const secretKey = 'rdggvrdgfrdgfdf';



export const registerUser = async (req, res) => {
    const {userName, password, role} = req.body;

    console.log(userName, password, role);

    const newUser = new User({userName, password, role});
    try {
        let userExists = await User.findOne({userName});
        if (userExists) {
            return res.status(400).json({error: "User Already exists"});
        }
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

export const loginUser = async (req, res) => {
    const {userName, password} = req.body;

    try {
        const user = await User.findOne({userName: userName});

        if (!user) {
            return res.status(400).json({ error: "No user found" });
        }

        const isMatch =  await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        
        const token = jwt.sign({id: user._id}, secretKey, {expiresIn: '1h'})
        res.json({user, token});
        
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}
