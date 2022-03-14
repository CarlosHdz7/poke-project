import IPokemon from 'interfaces/IPokemon';
import { rest } from 'msw';
import pokemonsMock from '../db.json';

const getPokemon = (id: string | readonly string[]) => {
  let response: IPokemon | undefined;
  if (typeof id === 'string') {
    const newId = parseInt(id, 10);
    response = pokemonsMock.pokemons.find((pokemon) => pokemon.id === newId);
  }
  return {
    response: response || {},
    status: response ? 200 : 404,
  };
};

const handlers = [
  //   rest.get(`${process.env.REACT_APP_BASE_URL}/pokemons`, (req, res, ctx) =>
  //     res(ctx.status(200), ctx.json(pokemonsMock.pokemons)),
  //   ),

  rest.get(`${process.env.REACT_APP_BASE_URL}/pokemons/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const data = getPokemon(id);
    return res(ctx.status(data.status), ctx.json(data.response));
  }),
];

export default handlers;
