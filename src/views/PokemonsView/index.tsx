import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/general/Pagination';
import PokemonCard from '../../components/general/PokemonCard';
import useFetchPokemons from '../../hooks/useFetchPokemons';
import usePagination from '../../hooks/usePagination';
import IPokemon from '../../interfaces/IPokemon';
import './index.scss';

const PokemonsView = () => {
  const [search, setSearch] = useSearchParams();
  const [filterState, setFilterState] = useState(search.get('name')?.trim() || '');
  const { data: pokemons, loading, error } = useFetchPokemons(filterState);

  const paginationConfig = {
    offset: 0,
    currentPageElements: [],
    elementsPerPage: 10,
    pagesCount: 1,
    allElements: [],
    totalElementsCount: 0,
  };

  const { paginationConfigState, handlePageClick, setPaginationConfigState } = usePagination(paginationConfig);

  console.log('o', paginationConfigState)
  console.log('o', handlePageClick)
  console.log('o', setPaginationConfigState)

  useEffect(() => {
    setPaginationConfigState((prev) => ({ ...prev, allElements: pokemons, totalElementsCount: pokemons?.length || 0, offset: 0 }));
  }, [pokemons])
  



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
        {!loading && !error &&
          pokemons?.map(({image, name, id}: IPokemon) => <PokemonCard key={id} image={image} name={name} id={id} />)}
      </div>

      <Pagination 
        offset={paginationConfigState.offset}
        currentPageElements={paginationConfigState.currentPageElements}
        elementsPerPage={paginationConfigState.elementsPerPage}
        pagesCount={paginationConfigState.pagesCount}
        allElements={paginationConfigState.allElements}
        totalElementsCount={paginationConfigState.totalElementsCount}
      />

      {!pokemons?.length && 'No results'}

      {loading && '...loading'}

      {error && 'An error has ocurred ...'}
    </>
  );
};

export default PokemonsView;
