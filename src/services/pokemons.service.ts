import IPokemon from '../interfaces/IPokemon';
import { get } from './fetchData';

const getAllPokemons = async () => {
  const pokemons = await get<IPokemon[]>(`https://poke-api-hdz.herokuapp.com/pokemons`);
  return pokemons;
};

const getPokemonById = async (id: number) => {
  const pokemon = await get<IPokemon>(`https://poke-api-hdz.herokuapp.com/pokemons/${id}`);
  return pokemon;
};

export { getAllPokemons, getPokemonById };
