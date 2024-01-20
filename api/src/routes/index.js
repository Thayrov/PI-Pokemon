const {Router} = require('express');
const {
  getPokemons,
  getPokemonDetail,
  getPokemonByName,
  createPokemon,
} = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemon/:idPokemon', getPokemonDetail);
router.get('/pokemons/name', getPokemonByName);
router.post('/pokemons', createPokemon);

module.exports = router;
