import React, { useEffect, useState } from 'react';
import PokemonCard from '../../components/general/PokemonCard';
import IPokemon from '../../interfaces/IPokemon';
import { getAllPokemons } from '../../services/pokemons.service';
import './index.scss';

const PokemonsView = () => {
  const [pokemonsState, setPokemonsState] = useState<IPokemon[]>();
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    getPokemons();
  }, [filterState]);

  const getPokemons = async () => {
    const pokemons = await getAllPokemons(filterState);
    setPokemonsState(pokemons);
  };

  const handleSearch = (value: string) => {
    setFilterState(value);
  };

  return (
    <>
      <h1 className="title">Pokemons</h1>
      <input
        value={filterState}
        type="text"
        className="searchbar"
        placeholder="Search ..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="cards-container">
        {pokemonsState?.length !== 0 &&
          pokemonsState?.map((pokemon: IPokemon) => <PokemonCard image={pokemon.image} name={pokemon.name} />)}
      </div>

      {!pokemonsState?.length && '...loading'}
    </>
  );
};

export default PokemonsView;
