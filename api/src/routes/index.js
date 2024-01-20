const {Router} = require('express');
const {
  getPokemons,
  getPokemonDetail,
  getPokemonByName,
  createPokemon,
} = require('../controllers/pokemons.controller');
const {getTypes} = require('../controllers/types.controller');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemon/:idPokemon', getPokemonDetail);
router.get('/pokemons/name', getPokemonByName);
router.post('/pokemons', createPokemon);
router.get('/types', getTypes);

module.exports = router;
