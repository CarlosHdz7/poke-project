import React, { useEffect, useState } from 'react';
import PokemonCard from '../../components/general/PokemonCard';
import IPokemon from '../../interfaces/IPokemon';
import { getAllPokemons } from '../../services/pokemons.service';
import './index.scss';

const PokemonsView = () => {
  const [pokemonsState, setPokemonsState] = useState<IPokemon[]>();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const pokemons = await getAllPokemons();
    setPokemonsState(pokemons);
  };

  return (
    <>
      <h1 className="title">Pokemons</h1>
      <div className="cards-container">
        {pokemonsState?.map((pokemon: IPokemon) => (
          <PokemonCard image={pokemon.image} name={pokemon.name} />
        ))}
      </div>
    </>
  );
};

export default PokemonsView;
