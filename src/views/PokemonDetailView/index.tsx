import React  from 'react';
import { useParams } from 'react-router-dom';
import useFetchPokemon from '../../hooks/useFetchPokemon';
import './index.scss';

const PokemonDetailView = () => {
  const {id} = useParams();
  const { data: pokemon, loading, error } = useFetchPokemon(id || '');

  return (
    <>
      {!loading && !error && 
        <div className='detail-container'>
          <div className='detail-container-options'>
            <i className="bi bi-arrow-left-circle-fill" />
            <i className="bi bi-heart-fill" />
          </div>
          <h1 className='detail-container-title'>{pokemon?.name}</h1>
          <div className='inner-detail-container'>
            <img 
              src={pokemon?.image} 
              alt=""
              className='inner-detail-image'
              />
          </div>
        </div>
      }
      {loading && '...loading'}

      {error && 'An error has ocurred ...'}
    </>
  )
};

export default PokemonDetailView;
