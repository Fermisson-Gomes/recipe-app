import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const path = window.location.pathname;
  const history = useHistory();

  const [inputSearch, setInputSearch] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => { history.push('/profile'); } }
        data-testid="profile-btn"
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </button>
      {path.endsWith('drinks') && (<h1 data-testid="page-title">Drinks</h1>)}
      {path.endsWith('profile') && (<h1 data-testid="page-title">Profile</h1>)}
      {path.endsWith('foods') && (<h1 data-testid="page-title">Foods</h1>)}
      {path.endsWith('done-recipes') && (<h1 data-testid="page-title">Done Recipes</h1>)}
      {path.endsWith('favorite-recipes')
        && (<h1 data-testid="page-title">Favorite Recipes</h1>)}
      {(path.endsWith('foods') || path.endsWith('drinks'))
      && (
        <button
          type="button"
          data-testid="search-btn"
          onClick={ () => setInputSearch(!inputSearch) }
        >
          <img
            src={ searchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
          />
        </button>)}
      {inputSearch
      && <input type="text" data-testid="search-input" placeholder="Search recipe" />}
    </header>
  );
}

export default Header;
