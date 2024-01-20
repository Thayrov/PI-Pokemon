const axios = require('axios');
const {Type} = require('../config/db.config');
const {API_URL} = require('../config/env.config');
const {
  determineIconType,
  determineImageType,
  processDamageRelations,
} = require('../helpers/type.helper');

const getTypes = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/type`);
    const apiTypes = response.data.results;

    // Procesar y crear tipos
    const typesPromises = apiTypes.map(async type => {
      const [typeInstance] = await Type.findOrCreate({
        where: {name: type.name},
        defaults: {
          icon: determineIconType(type.name),
          image: determineImageType(type.name),
        },
      });

      const typeDetailResponse = await axios.get(type.url);
      return processDamageRelations(typeDetailResponse.data.damage_relations, typeInstance);
    });

    await Promise.all(typesPromises);

    const types = await Type.findAll();
    res.status(200).json(types);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {getTypes};
