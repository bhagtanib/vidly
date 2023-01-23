const {Genre, validateUser, User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send("Invalid Email or Password")
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) {
        return res.status(400).send("Invalid Email or Password")
    };

    const token = jwt.sign({_id: user._id}, config.get('jwtKey'));

    res.header('x-auth-token',token);
});

function validate(req){
    const schema = Joi.object({
       password: Joi.string().min(3).max(250).required(),
       email: Joi.string().min(3).required().email()
    });
    return schema.validate(req);
}
module.exports = router;