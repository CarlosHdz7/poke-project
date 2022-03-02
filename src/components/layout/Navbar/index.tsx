import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Navbar = () => {
  const [sidebar, setSideBar] = useState<boolean>(false);

  const showSideBar = () => setSideBar(!sidebar);

  return (
    <>
      <div className="navbar">
        <button type="button" className="side-button" onClick={showSideBar}>
          <i className="bi bi-list" />
        </button>
        <div className="navbar-container-options">
          <Link to="/" className="navbar-container-item">
            PokeApi
          </Link>
          <div className="d-flex">
            <Link to="pokemons" className="navbar-container-item">
              Pokemons
            </Link>
            <Link to="bookmarks" className="navbar-container-item">
              Bookmarks
            </Link>
            <Link to="bookmarks" className="navbar-container-item">
              About
            </Link>
          </div>
        </div>
      </div>

      <nav className={sidebar ? 'side-menu-container active' : 'side-menu-container'}>
        <ul className="side-menu-items">
          <button type="button" className="side-menu__item--button" onClick={showSideBar}>
            <i className="bi bi-x-lg" />
          </button>
          <li className="side-menu__item">
            <Link to="/">
              {/* <i className={icon} /> */}
              <span>PokeApi</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link to="pokemons">
              <span>Pokemons</span>
            </Link>
          </li>
          <li className="side-menu__item">
            <Link to="bookmarks">
              <span>Bookmarks</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
