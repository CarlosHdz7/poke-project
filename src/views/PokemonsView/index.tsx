import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import PokemonCard from '../../components/general/PokemonCard';
import IPokemon from '../../interfaces/IPokemon';
import { getAllPokemons } from '../../services/pokemons.service';
import './index.scss';

const PokemonsView = () => {
  const [search, setSearch] = useSearchParams();
  const [pokemonsState, setPokemonsState] = useState<IPokemon[]>();
  const [filterState, setFilterState] = useState(search.get('name')?.trim() || '');

  useEffect(() => {
    getPokemons();
  }, [filterState]);

  const getPokemons = async () => {
    try {
      const pokemons = await getAllPokemons(filterState);
      setPokemonsState(pokemons);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value: string) => {
    const pokemonName = value.trim();
    setFilterState(pokemonName);
    setSearch(pokemonName ? { name: pokemonName } : {});
  };

  return (
    <>
      <h1 className="title">Pokemons</h1>
      <div className="searchbar-container">
        <i className="bi bi-search searchbar-container__icon" />
        <input
          value={filterState}
          type="text"
          className="searchbar-container__input"
          placeholder="Search ..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="cards-container">
        {pokemonsState?.length !== 0 &&
          pokemonsState?.map(({image, name, id}: IPokemon) => <PokemonCard image={image} name={name} id={id} />)}
      </div>

      {!pokemonsState?.length && '...loading'}
    </>
  );
};

export default PokemonsView;
