const {Router} = require('express');
const {getPokemons} = require('../controllers/pokemons.controller');

const router = Router();

router.get('/pokemons', getPokemons);

module.exports = router;
