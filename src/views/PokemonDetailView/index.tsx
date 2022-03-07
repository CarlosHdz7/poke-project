import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import useFetchPokemon from 'hooks/useFetchPokemon';
import useLocalStorage from 'hooks/useLocalStorage';
import IPokemon from 'interfaces/IPokemon';
import { IBookmark } from 'interfaces/IBookmark';
import { RootState } from 'rootReducer';
import { addBookmark, removeBookmark } from 'store/bookmarks/bookmarks.action';
import utils from 'utils/common';
import Loader from 'components/general/Loader';

import './index.scss';
import ProgressBar from 'components/general/ProgressBar';

const PokemonDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: pokemon, loading, error } = useFetchPokemon(id || '');
  const [, setBookmarksState] = useLocalStorage<IBookmark[]>('bookmarks', []);
  const bookmarks: IBookmark[] = useSelector((state: RootState) => state.bookmarks);

  useEffect(() => {
    setBookmarksState(bookmarks);
  }, [bookmarks]);

  const backToList = () => {
    navigate(-1);
  };

  const handleAddBookmark = (pokemonInfo: IPokemon) => {
    dispatch(
      addBookmark({
        uid: pokemonInfo.id,
        pokemon: pokemonInfo,
      }),
    );
  };

  const handleRemoveBookmark = (pokemonInfo: IPokemon) => {
    dispatch(
      removeBookmark({
        uid: pokemonInfo.id,
        pokemon: pokemonInfo,
      }),
    );
  };

  return (
    <>
      {!loading && pokemon && !error && (
        <div className="detail-container">
          <div className="detail-container-options">
            <i className="bi bi-arrow-left-circle-fill" onClick={backToList} aria-hidden="true" />
            {utils.isBookmarked(bookmarks, pokemon.id) ? (
              <i
                className="bi bi-heart-fill like-icon-2"
                onClick={() => handleRemoveBookmark(pokemon)}
                aria-hidden="true"
              />
            ) : (
              <i className="bi bi-heart" onClick={() => handleAddBookmark(pokemon)} aria-hidden="true" />
            )}
          </div>
          <h1 className="detail-container-title">{pokemon?.name}</h1>
          <div className="inner-detail-container">
            <img src={pokemon?.image} alt="" className="inner-detail-image" />
            <div className="types">
              {pokemon?.type?.map((typeColor) => (
                <span className={`badged ${typeColor}`} key={typeColor}>
                  {typeColor}
                </span>
              ))}
            </div>
            <div className="stats">
              <table className="stats__table">
                <tbody>
                  {pokemon?.stats?.map((stat) => (
                    <ProgressBar base={stat.base} name={stat.name} key={stat.name} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}

      {error && navigate(`/404`)}
    </>
  );
};

export default PokemonDetailView;
