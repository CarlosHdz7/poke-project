import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IPokemon from '../../interfaces/IPokemon';
import { getPokemonById } from '../../services/pokemons.service';
import './index.scss';

const PokemonDetailView = () => {
  const {id} = useParams();
  const [pokemonState, setPokemonState] = useState<IPokemon | undefined>();

  useEffect(() => {
    getPokemon();
  }, [id]);

  const getPokemon = async () => {
    try {
      if(id) {
        const pokemon = await getPokemonById(id);
        setPokemonState(pokemon);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='detail-container'>
      <div className='detail-container-options'>
        <i className="bi bi-arrow-left-circle-fill" />
        <i className="bi bi-heart-fill" />
      </div>
      <h1 className='detail-container-title'>{pokemonState?.name}</h1>
      <div className='inner-detail-container'>
        <img 
          src={pokemonState?.image} 
          alt=""
          className='inner-detail-image'
           />
      </div>
    </div>
  )
};

export default PokemonDetailView;
