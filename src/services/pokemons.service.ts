import IPokemon from '../interfaces/IPokemon';
import { get } from './fetchData';

const getAllPokemons = async (filter: string = '') => {
  const url = filter ? `/pokemons?name_like=${filter}` : '/pokemons';
  const pokemons = await get<IPokemon[]>(url);
  return pokemons;
};

const getPokemonById = async (id: number) => {
  const pokemon = await get<IPokemon>(`/pokemons/${id}`);
  return pokemon;
};

export { getAllPokemons, getPokemonById };
