const request = require('supertest');
const app = require('../../src/app');
const {conn} = require('../../src/config/db.config');

beforeAll(async () => {
  await conn.sync({force: true});
});

afterAll(async () => {
  await conn.close();
});

describe('Pokemon API routes', () => {
  let createdPokemonId;

  test('POST /api/pokemons creates a new Pokemon', async () => {
    const newPokemon = {
      name: 'Testmon',
      image: 'https://picsum.photos/200',
      hp: 45,
      attack: 49,
      special_attack: 65,
      defense: 49,
      special_defense: 65,
      speed: 45,
      height: 7,
      weight: 69,
      types: ['flying', 'ghost'],
      abilities: ['lightning-rod', 'static'],
      moves: ['thunder-shock', 'tail-whip', 'quick-attack'],
    };

    const response = await request(app).post('/api/pokemons').send(newPokemon);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdPokemonId = response.body.id;
  });

  test('PUT /api/pokemons/:idPokemon updates the Pokemon', async () => {
    const updatedData = {
      name: 'UpdatedTestmon',
    };

    const response = await request(app).put(`/api/pokemons/${createdPokemonId}`).send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'UpdatedTestmon');
  });

  test('DELETE /api/pokemons/:idPokemon deletes the Pokemon', async () => {
    const response = await request(app).delete(`/api/pokemons/${createdPokemonId}`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Pokemon deleted successfully');
  });
});
