const {Move} = require('../config/db.config');

async function processMoves(movesNames, pokemon) {
  let movesPromises = movesNames.map(async moveName => {
    const [moveInstance] = await Move.findOrCreate({
      where: {name: moveName},
    });
    const alreadyAssociated = await pokemon.hasMove(moveInstance);
    if (!alreadyAssociated) {
      await pokemon.addMove(moveInstance);
    }
  });
  return await Promise.all(movesPromises);
}

module.exports = {processMoves};
