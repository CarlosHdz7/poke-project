import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import utils from '../../../utils/common';
import IPokemon from '../../../interfaces/IPokemon';

const PokemonCard = (props: IPokemon) => {
  const navigate = useNavigate();
  const { image, name, id, type } = props;

  const goToPokemonView = (pokemonId: number) => {
    navigate(`/pokemons/${pokemonId}`);
  };

  return (
    <div className="card" onClick={() => goToPokemonView(id)} aria-hidden="true">
      <div className="img-container">
        <img src={image} alt="" />
      </div>
      <p className="card-title">{utils.setCapitalLetter(name)}</p>
      <p>
        {type?.map((t) => (
          <span className={`badged ${t}`}>{t}</span>
        ))}
      </p>
    </div>
  );
};

export default PokemonCard;
