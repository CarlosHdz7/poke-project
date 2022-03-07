import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from 'components/layout/Navbar';
import AboutView from 'views/AboutView';
import BookmarksView from 'views/BookmarksView';
import PokemonDetailView from 'views/PokemonDetailView';
import PokemonsView from 'views/PokemonsView';
import Error404 from 'views/Errors/Error404';

const AppRouter = () => (
  <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="pokemons" element={<PokemonsView />} />
        <Route path="pokemons/:id" element={<PokemonDetailView />} />
        <Route path="bookmarks" element={<BookmarksView />} />
        <Route path="about" element={<AboutView />} />
        <Route path="404" element={<Error404 />} />
        <Route path="/" element={<PokemonsView />} />
      </Routes>
    </div>
  </>
);

export default AppRouter;
