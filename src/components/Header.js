import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header() {
  const history = useHistory();
  const { search, handleSearchChange } = useContext(Context);
  const {
    location: { pathname },
  } = history;

  const [inputSearch, setInputSearch] = useState(false);

  return (
    <header>
      <div className="header">
        <button
          type="button"
          onClick={ () => {
            history.push('/profile');
          } }
          data-testid="profile-btn"
          className="header-icon"
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
        {pathname.endsWith('drinks') && (
          <h1 data-testid="page-title">Drinks</h1>
        )}
        {pathname.endsWith('profile') && (
          <h1 data-testid="page-title">Profile</h1>
        )}
        {pathname.endsWith('foods') && <h1 data-testid="page-title">Foods</h1>}
        {pathname.endsWith('done-recipes') && (
          <h1 data-testid="page-title">Done Recipes</h1>
        )}
        {pathname.endsWith('favorite-recipes') && (
          <h1 data-testid="page-title">Favorite Recipes</h1>
        )}
        {(pathname.endsWith('foods') || pathname.endsWith('drinks')) && (
          <button
            type="button"
            data-testid="search-btn"
            onClick={ () => setInputSearch(!inputSearch) }
            className="header-icon"
          >
            <img
              src={ searchIcon }
              alt="search-icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      {inputSearch && (
        <>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search recipe"
            onChange={ handleSearchChange }
            value={ search }
            className="input-header"
          />
          <SearchBar />
        </>
      )}
    </header>
  );
}

export default Header;
