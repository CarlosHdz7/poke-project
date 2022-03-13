import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';

import Loader from 'components/general/Loader';
import Pagination from 'components/general/Pagination';
import PokemonCard from 'components/general/PokemonCard';
import useFetchPokemons from 'hooks/useFetchPokemons';
import IPokemon from 'interfaces/IPokemon';

import './index.scss';

const PokemonsView = () => {
  const [search, setSearch] = useSearchParams();
  const [nameState, setNameState] = useState(search.get('name')?.trim() || '');
  const [pageState, setPageState] = useState(search.get('page')?.trim() || '1');
  const { data: pokemons, loading, error } = useFetchPokemons({ name: nameState, page: pageState });
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputRef.current.value = nameState;
  }, [nameState]);

  const handleSearch = _.debounce(() => {
    const pokemonName = inputRef.current.value.trim();
    setNameState(pokemonName);
    setSearch(pokemonName ? { name: pokemonName } : {});
  }, 1000);

  const handlePage = (value: string) => {
    const pageNumber = value.trim();
    setPageState(pageNumber);
    setSearch(pageNumber ? { page: pageNumber } : {});
  };

  return (
    <>
      <h1 className="title">Pokemons List</h1>
      <div className="searchbar-container">
        <i className="bi bi-search searchbar-container__icon" />
        <input
          type="text"
          className="searchbar-container__input"
          placeholder="Search ..."
          ref={inputRef}
          onChange={handleSearch}
        />
      </div>

      {!loading && !error && (
        <div className="main-container">
          {!nameState && <Pagination handlePage={handlePage} currentPage={pageState} />}

          <div className="cards-container">
            {pokemons?.map(({ image, name, id, type }: IPokemon) => (
              <PokemonCard key={id} image={image} name={name} id={id} type={type} />
            ))}
          </div>

          {!nameState && <Pagination handlePage={handlePage} currentPage={pageState} />}
        </div>
      )}

      {!pokemons?.length && !loading && <p className="message">No results X_X</p>}

      {loading && <Loader />}

      {error && <p className="message">An error has ocurred ...</p>}
    </>
  );
};

export default PokemonsView;
