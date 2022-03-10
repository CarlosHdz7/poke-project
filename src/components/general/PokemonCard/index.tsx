import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import utils from 'utils/common';
import IPokemon from 'interfaces/IPokemon';
import { IBookmark } from 'interfaces/IBookmark';
import { RootState } from 'rootReducer';

import './index.scss';
import appRoutes from 'routes';

const PokemonCard = (props: IPokemon) => {
  const navigate = useNavigate();
  const { image, name, id, type } = props;
  const bookmarks: IBookmark[] = useSelector((state: RootState) => state.bookmarks);

  const goToPokemonView = (pokemonId: number) => {
    navigate(`/${appRoutes.POKEMONS}/${pokemonId}`);
  };

  return (
    <button type="button" className="card shadow" onClick={() => goToPokemonView(id)} name={name}>
      {utils.isBookmarked(bookmarks, id) && <i className="bi bi-heart-fill like-icon" />}
      <div className="img-container">
        <img src={image} alt="" />
      </div>
      <p className="card-title">{utils.setCapitalLetter(name)}</p>
      <p>
        {type?.map((typeColor) => (
          <span className={`badged ${typeColor}`} key={typeColor}>
            {typeColor}
          </span>
        ))}
      </p>
    </button>
  );
};

export default PokemonCard;
