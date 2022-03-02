import React, { useEffect } from 'react';
import { getAllPokemons } from '../../services/pokemons.service';

const PokemonsView = () => {
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const pokemons = await getAllPokemons();
    console.log(pokemons);
  };

  return <div>pokemons</div>;
};

export default PokemonsView;
