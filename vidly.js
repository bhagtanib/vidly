const mongoose = require('mongoose');
const movies = require('./routes/movies');
const customers  = require('./routes/customers');
const genres  = require('./routes/genres');
const users  = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const config = require('config');
const app = express();

if(!config.get('jwtKey')){
  console.log('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
} 
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/movies',movies);
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/auth', auth);



const port = process.env.PORT || 27017;
app.listen(port, () => console.log(`Listening on port ${port}...`));
