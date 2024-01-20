const {Router} = require('express');
const {getPokemons, getPokemonDetail} = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemons/:idPokemon', getPokemonDetail);

module.exports = router;
