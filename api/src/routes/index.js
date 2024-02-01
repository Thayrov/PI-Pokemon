const {Router} = require('express');
const {
  getPokemons,
  getPokemonDetail,
  getPokemonByName,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require('../controllers/pokemons.controller');
const {
  getTypes,
  getTypesByPokemonId,
  getTypesRelations,
} = require('../controllers/types.controller');
const {getAbilitiesByPokemonId} = require('../controllers/abilities.controller');
const {getMovesByPokemonId} = require('../controllers/moves.controller');

const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemon/:idPokemon', getPokemonDetail);
router.get('/pokemons/name', getPokemonByName);

router.post('/pokemons', createPokemon);
router.put('/pokemons/:idPokemon', updatePokemon);
router.delete('/pokemons/:idPokemon', deletePokemon);

router.get('/types', getTypes);
router.get('/types/relations', getTypesRelations);
router.get('/types/:idPokemon', getTypesByPokemonId);

router.get('/abilities/:idPokemon', getAbilitiesByPokemonId);

router.get('/moves/:idPokemon', getMovesByPokemonId);

module.exports = router;
