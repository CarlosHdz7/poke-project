import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookmarksView from '../BookmarksView';
import PokemonDetailView from '../PokemonDetailView';
import PokemonsView from '../PokemonsView';

const AppRouter = () => (
  <Routes>
    <Route path="pokemons" element={<PokemonsView />} />
    <Route path="pokemons/:id" element={<PokemonDetailView />} />
    <Route path="bookmarks" element={<BookmarksView />} />
  </Routes>
);

export default AppRouter;
