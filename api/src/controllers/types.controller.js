const axios = require('axios');
const {Type, Pokemon, TypeRelationship} = require('../config/db.config');
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

const getTypesByPokemonId = async (req, res) => {
  try {
    const {idPokemon} = req.params;
    const pokemon = await Pokemon.findOne({
      where: {id: idPokemon},
      include: {
        model: Type,
        through: {attributes: []},
      },
    });

    if (!pokemon) {
      return res.status(404).send('Pokemon not found');
    }
    res.status(200).json(pokemon.Types);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getTypesRelations = async (req, res) => {
  try {
    // Fetch types with their relationships
    const typesWithRelations = await Type.findAll({
      include: {
        model: Type,
        as: 'RelatedTypes',
        through: {
          model: TypeRelationship,
          as: 'relationship',
          attributes: ['relationshipType'],
        },
        attributes: ['id', 'name'],
      },
      attributes: ['id', 'name'],
    });

    // Transform data into a structured format
    const formattedTypes = typesWithRelations.map(type => {
      const relations = type.RelatedTypes.map(relatedType => ({
        relatedTypeId: relatedType.id,
        relatedTypeName: relatedType.name,
        relationshipType: relatedType.relationship.relationshipType,
      }));

      return {
        typeId: type.id,
        typeName: type.name,
        relations: relations,
      };
    });

    res.status(200).json(formattedTypes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {getTypes, getTypesByPokemonId, getTypesRelations};
