const mongoose = require('mongoose')
const Joi = require('joi');
mongoose.connect('mongodb://localhost/vidly')
//.then( ()=> console.log("Connection successful to movie database"))
.catch(err => console.log("Some Error: ", err));

const genreSchema = new mongoose.Schema({
    name: String
})
const Genre = mongoose.model("Genre", genreSchema)

function validateGenre(genre){
   const schema = Joi.object({
       name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}
exports.validateGenre = validateGenre
exports.genreSchema = genreSchema
exports.Genre = Genre