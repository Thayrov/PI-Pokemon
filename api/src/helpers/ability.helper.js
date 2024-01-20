const {Ability} = require('../config/db.config');

async function processAbilities(abilitiesNames, pokemon) {
  let abilitiesPromises = abilitiesNames.map(async abilityName => {
    const [abilityInstance] = await Ability.findOrCreate({
      where: {name: abilityName},
    });

    const alreadyAssociated = await pokemon.hasAbility(abilityInstance);
    if (!alreadyAssociated) {
      await pokemon.addAbility(abilityInstance);
    }
  });
  return await Promise.all(abilitiesPromises);
}

module.exports = {processAbilities};
