const router = require('express').Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const {userName, password, role} = req.body;

    console.log(userName, password, role);

    const newUser = new User({userName, password, role});

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
})

module.exports = router;