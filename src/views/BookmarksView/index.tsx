import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IBookmark } from 'interfaces/IBookmark';
import IPokemon from 'interfaces/IPokemon';
import { RootState } from 'rootReducer';
import { removeBookmark } from 'store/bookmarks/bookmarks.action';
import utils from 'utils/common';

import './index.scss';

const BookmarksView = () => {
  const bookmarks: IBookmark[] = useSelector((state: RootState) => state.bookmarks);
  const dispatch = useDispatch();

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
      <h1 className="title">Bookmarks</h1>
      <div className="bookmarks-container">
        {bookmarks.map((bookmark) => (
          <div className="bookmark shadow" key={bookmark.uid}>
            <div className="bookmarl-inner-container-1">
              <img src={bookmark.pokemon.image} alt="" className="bookmarl-inner-container__img" />
              <div>
                <p className="bookmarl-inner-container__title">{utils.setCapitalLetter(bookmark.pokemon.name)}</p>
                <p>
                  {bookmark.pokemon.type?.map((t) => (
                    <span className={`badged ${t}`} key={t}>
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="bookmarl-inner-container-2">
              <button type='button'className='delete-button' onClick={() => handleRemoveBookmark(bookmark.pokemon)}>
                <i
                  className="bi bi-trash3-fill"
                />
              </button>
            </div>
          </div>
        ))}

        {!bookmarks.length && <p className="message">No results X_X</p>}
      </div>
    </>
  );
};
export default BookmarksView;
