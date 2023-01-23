const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly');
const Joi = require('joi');
const { string } = require('joi');

const User = mongoose.model('User', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2450
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50
    }

}));

function validateUser(user){
    const schema = Joi.object({
       name: Joi.string().min(3).max(50).required(),
       password: Joi.string().min(3).max(250).required(),
       email: Joi.string().min(3).required().email()
    });
    return schema.validate(user);

}

exports.User = User;
exports.validateUser = validateUser;