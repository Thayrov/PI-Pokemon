const {Move, Pokemon} = require('../config/db.config');

const getMovesByPokemonId = async (req, res) => {
  try {
    const {idPokemon} = req.params;
    const pokemon = await Pokemon.findOne({
      where: {id: idPokemon},
      include: {
        model: Move,
        through: {attributes: []},
      },
    });

    if (!pokemon) {
      return res.status(404).send('Pokemon not found');
    }
    res.status(200).json(pokemon.Moves);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {getMovesByPokemonId};
