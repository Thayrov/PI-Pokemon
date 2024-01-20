const {Type, TypeRelationship, conn} = require('../config/db.config');

async function processTypes(typeNames, pokemon) {
  let typesPromises = typeNames.map(async typeName => {
    const [typeInstance, created] = await Type.findOrCreate({
      where: {name: typeName},
      defaults: {
        icon: determineIconType(typeName),
        image: determineImageType(typeName),
      },
    });

    const alreadyAssociated = await pokemon.hasType(typeInstance);
    if (!alreadyAssociated) {
      await pokemon.addType(typeInstance);
    }
  });
  return await Promise.all(typesPromises);
}

function determineIconType(type) {
  if (!type) {
    return 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705536696/pokemon/icons/pokemon_icon_213976_yy8wzo.svg';
  }
  const typeToIconMap = {
    normal:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535603/pokemon/icons/normal_zfwrga.svg',
    fire: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535605/pokemon/icons/fire_wqrlq1.svg',
    water:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535603/pokemon/icons/water_iwums9.svg',
    electric:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535603/pokemon/icons/electric_ul8exg.svg',
    grass:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535603/pokemon/icons/grass_qfdkyx.svg',
    ice: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535607/pokemon/icons/ice_bh3myh.svg',
    fighting:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535605/pokemon/icons/fighting_ullvv3.svg',
    poison:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535607/pokemon/icons/poison_zbcuuh.svg',
    ground:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535603/pokemon/icons/ground_rcns7q.svg',
    flying:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535607/pokemon/icons/flying_ywckpm.svg',
    psychic:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535606/pokemon/icons/psychic_ef0zho.svg',
    bug: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535606/pokemon/icons/bug_muoycs.svg',
    rock: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535605/pokemon/icons/rock_xdfn2d.svg',
    ghost:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535605/pokemon/icons/ghost_talxhs.svg',
    dragon:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535605/pokemon/icons/dragon_avbdra.svg',
    dark: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535603/pokemon/icons/dark_cwmwot.svg',
    steel:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535604/pokemon/icons/steel_epo7ci.svg',
    fairy:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535604/pokemon/icons/fairy_qyloby.svg',
  };

  const primaryType = type;
  return (
    typeToIconMap[primaryType] ||
    'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705536696/pokemon/icons/pokemon_icon_213976_yy8wzo.svg'
  );
}

function determineImageType(type) {
  if (!type) {
    return 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705537375/pokemon/bg/White_Wallpaper_jcu1le.png';
  }

  const typeToImageMap = {
    normal:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535689/pokemon/bg/Normal_Wallpaper_qvcghu.png',
    fire: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535689/pokemon/bg/Fire_Wallpaper_txlojy.png',
    water:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535689/pokemon/bg/Water_Wallpaper_qfaitu.png',
    electric:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535688/pokemon/bg/Electric_Wallpaper_uqaqgq.png',
    grass:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535693/pokemon/bg/Grass_Wallpaper_yk1dxc.png',
    ice: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535695/pokemon/bg/Ice_Wallpaper_nuwibp.png',
    fighting:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535693/pokemon/bg/Fighting_Wallpaper_hjk1jf.png',
    poison:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535692/pokemon/bg/Poison_Wallpaper_yjwcjx.png',
    ground:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535695/pokemon/bg/Ground_Wallpaper_iare7q.png',
    flying:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535692/pokemon/bg/Flying_Wallpaper_w4mjgq.png',
    psychic:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535694/pokemon/bg/Psychic_Wallpaper_uekglg.png',
    bug: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535691/pokemon/bg/Bug_Wallpaper_m2uzaf.png',
    rock: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535691/pokemon/bg/Rock_Wallpaper_y4ogyw.png',
    ghost:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535694/pokemon/bg/Ghost_Wallpaper_aesmeg.png',
    dragon:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535691/pokemon/bg/Dragon_Wallpaper_crjnii.png',
    dark: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535690/pokemon/bg/Dark_Wallpaper_wwgmsa.png',
    steel:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535690/pokemon/bg/Steel_Wallpaper_vt6s3w.png',
    fairy:
      'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705535690/pokemon/bg/Fairy_Wallpaper_bnjor9.png',
  };

  const primaryType = type;
  return (
    typeToImageMap[primaryType] ||
    'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705537375/pokemon/bg/White_Wallpaper_jcu1le.png'
  );
}

const processDamageRelations = async (damageRelations, typeInstance) => {
  const relationsPromises = Object.keys(damageRelations).flatMap(relationKey =>
    damageRelations[relationKey].map(async relatedType => {
      const [relatedTypeInstance] = await Type.findOrCreate({
        where: {name: relatedType.name},
      });

      let transaction;
      try {
        transaction = await conn.transaction();

        const relationExists = await TypeRelationship.findOne({
          where: {
            typeId: typeInstance.id,
            relatedTypeId: relatedTypeInstance.id,
            relationshipType: relationKey,
          },
          transaction,
        });

        if (!relationExists) {
          await TypeRelationship.create(
            {
              typeId: typeInstance.id,
              relatedTypeId: relatedTypeInstance.id,
              relationshipType: relationKey,
            },
            {transaction},
          );
        }

        await transaction.commit();
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
      }
    }),
  );

  return Promise.all(relationsPromises);
};

module.exports = {
  processTypes,
  determineIconType,
  determineImageType,
  processDamageRelations,
};
