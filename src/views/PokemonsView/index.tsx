import React, { useEffect, useState } from 'react';
import IPokemon from '../../interfaces/IPokemon';
import { getAllPokemons } from '../../services/pokemons.service';

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
      <h1>pokemons</h1>
      <div className="pokemons-container">{pokemonsState?.map((pokemon: IPokemon) => `Nombre: ${pokemon.name}`)}</div>
    </>
  );
};

export default PokemonsView;
