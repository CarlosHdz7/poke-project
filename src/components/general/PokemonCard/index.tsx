import React from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import utils from '../../../utils/common';
import IPokemon from '../../../interfaces/IPokemon';
import { IBookmark } from '../../../interfaces/IBookmark';
import { RootState } from '../../../rootReducer';

const PokemonCard = (props: IPokemon) => {
  const navigate = useNavigate();
  const { image, name, id, type } = props;
  const bookmarks: IBookmark[] = useSelector((state: RootState) => state.bookmarks);

  const goToPokemonView = (pokemonId: number) => {
    navigate(`/pokemons/${pokemonId}`);
  };

  return (
    <div className="card" onClick={() => goToPokemonView(id)} aria-hidden="true">
      {utils.isBookmarked(bookmarks, id) && <i className="bi bi-heart-fill like-icon" />}
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
