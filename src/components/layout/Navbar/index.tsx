import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import pokeball from 'assets/pokeball.png';

import './index.scss';

const Navbar = () => {
  const activeClassName = 'active';
  const itemClassName = 'navbar-container-item';
  const [sidebar, setSideBar] = useState<boolean>(false);

  const showSideBar = () => setSideBar(!sidebar);

  // ToDo: Optimize this

  return (
    <>
      <div className="navbar shadow">
        <button type="button" className="side-button" onClick={showSideBar}>
          <i className="bi bi-list" />
        </button>
        <div className="navbar-container-options">
          <NavLink to="/" className="navbar-container-item navbar-container-item__logo">
            <img src={pokeball} alt="" className="navbar-image" />
            PokeApi
          </NavLink>
          <div>
            <NavLink
              to="bookmarks"
              className={({ isActive }) => (isActive ? `${itemClassName} ${activeClassName}` : itemClassName)}
            >
              Bookmarks
            </NavLink>
            <NavLink
              to="about"
              className={({ isActive }) => (isActive ? `${itemClassName} ${activeClassName}` : itemClassName)}
            >
              About
            </NavLink>
          </div>
        </div>
      </div>

      <nav className={sidebar ? 'side-menu-container active' : 'side-menu-container'}>
        <ul className="side-menu-items">
          <button type="button" className="side-menu__item--button side-button-close" onClick={showSideBar}>
            <i className="bi bi-x-lg" />
          </button>
          <li className="side-menu__item side-bar-text">Side Bar Options</li>
          <li className="side-menu__item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={showSideBar}>
              <span>PokeApi</span>
            </NavLink>
          </li>
          <li className="side-menu__item">
            <NavLink to="bookmarks" className={({ isActive }) => (isActive ? 'active' : '')} onClick={showSideBar}>
              <span>Bookmarks</span>
            </NavLink>
          </li>
          <li className="side-menu__item">
            <NavLink to="about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={showSideBar}>
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
