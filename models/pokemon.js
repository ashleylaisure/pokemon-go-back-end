const mongoose = require('mongoose');

// Create the schema
const pokemonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        min: 0,
        required: true,
    },
    abilities: {
        type: String,
        required: true,
    },

})

// Register the model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
// export the model from the pokemon.js file
module.exports = Pokemon;