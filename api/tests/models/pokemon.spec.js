const {Pokemon, conn} = require('../../src/config/db.config');
const {beforeEach, afterAll, describe, test, expect} = require('@jest/globals');

beforeAll(async () => {
  await conn.sync({force: true});
});

afterAll(async () => {
  await conn.close();
});

describe('Pokemon model', () => {
  beforeEach(async () => {
    await Pokemon.destroy({where: {}});
  });

  test('Should create a new Pokemon', async () => {
    const newPokemon = await Pokemon.create({
      name: 'Pikachu',
      hp: 35,
      attack: 55,
      defense: 40,
      special_attack: 65,
      defense: 49,
      special_defense: 65,
      speed: 45,
      height: 7,
      weight: 69,
      types: ['flying', 'ghost'],
      abilities: ['lightning-rod', 'static'],
      moves: ['thunder-shock', 'tail-whip', 'quick-attack'],
    });

    expect(newPokemon).toHaveProperty('id');
    expect(newPokemon.name).toBe('Pikachu');
  });

  test('Should update a Pokemon', async () => {
    let pikachu = await Pokemon.create({name: 'Pikachu', hp: 35});
    pikachu = await pikachu.update({hp: 45});

    expect(pikachu.hp).toBe(45);
  });

  test('Should delete a Pokemon', async () => {
    const pikachu = await Pokemon.create({name: 'Pikachu', hp: 35});
    await pikachu.destroy();

    const foundPokemon = await Pokemon.findByPk(pikachu.id);

    expect(foundPokemon).toBeNull();
  });
});
