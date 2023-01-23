const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({})
const mongoose = require('mongoose')
const {genreSchema} = require('./genre')
mongoose.connect('mongodb://localhost/vidly')
.then( ()=> console.log("Connection successful to movie database"))
.catch(err => console.log("Some Error: ", err));


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        required:true,
        type: Number,
        min: 0,
        max: 255
    },
    price: {
        required:true,
        type: Number,
        min: 0,
        max: 255
    }
})
const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie){
    const schema = Joi.object ({
        title: Joi.string().min(5).max(50).required(),
        genreID:  Joi.string().required(),
        numberInStock: Joi.number().min(0).max(500).required(),
        title: Joi.number().min(0).required()
    }).options({ abortEarly: false });
  return schema.validate(movie);
}


exports.Movie = Movie; 
exports.validateMovie = validateMovie;