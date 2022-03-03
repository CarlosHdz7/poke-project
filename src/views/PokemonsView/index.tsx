import React, { useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import PokemonCard from '../../components/general/PokemonCard';
import useFetchPokemons from '../../hooks/useFetchPokemons';
import IPokemon from '../../interfaces/IPokemon';
import './index.scss';

const PokemonsView = () => {
  const [search, setSearch] = useSearchParams();
  const [filterState, setFilterState] = useState(search.get('name')?.trim() || '');
  const { data: pokemons, loading, error } = useFetchPokemons(filterState);

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
        {!loading &&
          pokemons?.map(({image, name, id}: IPokemon) => <PokemonCard key={id} image={image} name={name} id={id} />)}
      </div>

      {loading && '...loading'}

      {error && 'An error has ocurred ...'}
    </>
  );
};

export default PokemonsView;
