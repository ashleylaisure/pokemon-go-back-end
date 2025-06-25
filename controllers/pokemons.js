// Import the model
const Pokemon = require('../models/pokemon.js')
const express = require('express');
const router = express.Router();

// CREATE - POST - /pokemons
router.post('/', async (req, res) => {
    // res.json({message : 'Create Route'});
    try {
        // create a new pokemon with the data from req.body
        const createdPokemon = await Pokemon.create(req.body);
        res.status(201).json(createdPokemon);
    } catch (err) {
        // setup for error handling
        res.status(500).json({err: err.message});
    }
})

// READ INDEX - GET - /pokemons
router.get('/', async (req, res) => {
    // res.json({message : "Index Route"})
    try {
        const foundPokemon = await Pokemon.find();
        res.status(200).json(foundPokemon);
    } catch (err) {
        res.status(500).json({err : err.message})
    }
})

// READ DETAILS - GET - /pokemons/:pokemonsId
router.get('/:pokemonId', async (req, res) => {
    // res.json({message: `Show route with the param ${req.params.pokemonId}`})
    try {
        const foundPokemon = await Pokemon.findById(req.params.pokemonId);

        if(!foundPokemon) {
            req.status(404);
            throw new Error('Pokemon not found.');
        }
        res.status(200).json(foundPokemon)

    } catch (err) {
        if (res.statusCode === 404) {
            res.json({err: err.message})
        } else {
            res.status(500).json({err: err.message})
        }
    }
})

// DELETE - DELETE - /pokemon/:pokemonId
router.delete('/:pokemonId', async (req, res) => {
    // res.json({message : `Delete Route for ${req.params.pokemonId}`})
    try {
        const deletePokemon = await Pokemon.findByIdAndDelete(req.params.pokemonId)

        if (!deletePokemon) {
            req.status(404);
            throw new Error('Pokemon not found.')
        }
        res.status(200).json(deletePokemon)

    } catch (error) {
        if (res.statusCode === 404) {
            res.json({error : error.message})
        } else {
            res.status(500).json({error: error.message})
        }
    }
})

// UPDATE - PUT - /pokemon/:pokemonId 
router.put('/:pokemonId', async (req, res) => {
    // res.json({message : `Update route with the param ${req.params.pokemonId}`})
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.pokemonId, req.body, {new : true});
        if(!updatedPokemon) {
            res.status(404)
            throw new Error("Pokemon not found.");
        }
        res.status(200).json(updatedPokemon)
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({err : err.message})
        } else {
            res.status(500).json({err: err.message})
        }
    }
})
// Export the router at the bottom of the file
module.exports = router;