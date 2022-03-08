import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from 'components/layout/Navbar';
import AboutView from 'views/AboutView';
import BookmarksView from 'views/BookmarksView';
import PokemonDetailView from 'views/PokemonDetailView';
import PokemonsView from 'views/PokemonsView';
import Error404 from 'views/Errors/Error404';
import appRoutes from 'routes';

const AppRouter = () => (
  <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path={appRoutes.POKEMONS} element={<PokemonsView />} />
        <Route path={appRoutes.POKEMON_DETAIL} element={<PokemonDetailView />} />
        <Route path={appRoutes.BOOKMARKS} element={<BookmarksView />} />
        <Route path={appRoutes.ABOUT} element={<AboutView />} />
        <Route path={appRoutes.ERROR_404} element={<Error404 />} />
        <Route path={appRoutes.HOME} element={<PokemonsView />} />
      </Routes>
    </div>
  </>
);

export default AppRouter;
