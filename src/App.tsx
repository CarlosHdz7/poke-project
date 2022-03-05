import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from './hooks/useLocalStorage';
import { IBookmark } from './interfaces/IBookmark';
import { setBookmarks } from './store/bookmarks/bookmarks.action';
import AppRouter from './views/AppRouter';

const App = () => {
  const dispatch = useDispatch();
  const [stateBookmarks] = useLocalStorage<IBookmark[]>('bookmarks', []);

  useEffect(() => {
    dispatch(setBookmarks(stateBookmarks));
  }, [dispatch]);
  return <AppRouter />;
};

export default App;
