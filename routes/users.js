const {Genre, validateUser, User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(400).send("User already registered")
    };

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = jwt.sign({_id: user._id}, config.get('jwtKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
    
});
module.exports = router;