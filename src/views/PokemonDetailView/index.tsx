import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchPokemon from '../../hooks/useFetchPokemon';
import IPokemon from '../../interfaces/IPokemon';
import './index.scss';
import { addBookmark, removeBookmark } from '../../store/bookmarks/bookmarks.action';
import { RootState } from '../../rootReducer';
import { IBookmark } from '../../interfaces/IBookmark';
import useLocalStorage from '../../hooks/useLocalStorage';
import utils from '../../utils/common';
import Loader from '../../components/general/loader';

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
            <div className="stats">
              <table className="stats__table">
                <tr>
                  <td>Hp</td>
                  <td>46</td>
                  <td>barra</td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td>46</td>
                  <td>barra</td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td>46</td>
                  <td>barra</td>
                </tr>
                <tr>
                  <td>Sp. Atk</td>
                  <td>46</td>
                  <td>barra</td>
                </tr>
                <tr>
                  <td>Sp. Def</td>
                  <td>46</td>
                  <td>barra</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>46</td>
                  <td>barra</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}

      {error && 'An error has ocurred ...'}
    </>
  );
};

export default PokemonDetailView;
