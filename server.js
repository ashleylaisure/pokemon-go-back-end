const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

// Import the controller file
const pokemonRouter = require('./controllers/pokemons.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// app.use(cors());
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
// Add the Router to the `/pokemons` route
app.use('/pokemons', pokemonRouter);

app.listen(3000, () => {
    console.log('The express app is ready!');
});
