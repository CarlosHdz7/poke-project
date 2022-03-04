import { IFilter } from '../interfaces/IFilter';
import IPokemon from '../interfaces/IPokemon';
import { get } from './fetchData';

const getAllPokemons = async (filter: IFilter) => {
  console.log(filter);
  const url =
    filter.name !== ''
      ? `/pokemons?name_like=${filter.name}`
      : `/pokemons?_page=${filter.page ? filter.page : '1'}&_limit=10`;

  console.log(url);

  const pokemons = await get<IPokemon[]>(url);
  return pokemons;
};

const getPokemonById = async (id: string) => {
  const pokemon = await get<IPokemon>(`/pokemons/${id}`);
  return pokemon;
};

export { getAllPokemons, getPokemonById };
