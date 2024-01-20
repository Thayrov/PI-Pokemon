const {Router} = require('express');
const {
  getPokemons,
  getPokemonDetail,
  getPokemonByName,
} = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemon/:idPokemon', getPokemonDetail);
router.get('/pokemons/name', getPokemonByName);

module.exports = router;
