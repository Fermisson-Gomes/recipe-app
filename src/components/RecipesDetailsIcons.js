import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import heartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { Context } from '../context/Context';

function RecipesDetailsIcons() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [isFavorite, setIsFavorite] = useState(false);
  const [clickedMessage, setClickMessage] = useState();
  const { details } = useContext(Context);

  useEffect(() => {
    if (pathname.includes('/foods')) {
      const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifyFavorite = favoritesLocalStorage?.some((item) => item
        .id === details?.meals[0].idMeal);
      if (verifyFavorite) {
        setIsFavorite(true);
      }
    }
    if (pathname.includes('/drink')) {
      const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const verifyFavorite = favoritesLocalStorage?.some((item) => item
        .id === details?.drinks[0].idDrink);
      if (verifyFavorite) {
        setIsFavorite(true);
      }
    }
  }, [pathname, details]);

  const handleClickShare = () => {
    const url = `http://localhost:3000${pathname}`;
    const twoSec = 2000;
    clipboardCopy(url);
    setClickMessage(true);
    setTimeout(() => {
      setClickMessage(false);
    }, twoSec);
  };

  const handleClickFavoriteFood = () => {
    const detailsMeal = {
      id: details.meals[0].idMeal,
      type: 'food',
      nationality: details.meals[0].strArea,
      category: details.meals[0].strCategory,
      alcoholicOrNot: '',
      name: details.meals[0].strMeal,
      image: details.meals[0].strMealThumb,
    };
    const getItemLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (isFavorite === false) {
      setIsFavorite(true);
      if (getItemLocalStorage === null) {
        const setToLocalStorage = [detailsMeal];
        localStorage.setItem('favoriteRecipes', JSON.stringify(setToLocalStorage));
      } else {
        const favoriteObj = [...getItemLocalStorage, detailsMeal];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObj));
      }
    }
    if (isFavorite) {
      setIsFavorite(false);
      const removedFavorite = getItemLocalStorage.filter((item) => item
        .id !== detailsMeal.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedFavorite));
    }
  };

  const handleClickFavoriteDrink = () => {
    const detailsDrink = {
      id: details.drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: details.drinks[0].strCategory,
      alcoholicOrNot: details.drinks[0].strAlcoholic,
      name: details.drinks[0].strDrink,
      image: details.drinks[0].strDrinkThumb,
    };
    const getItemLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (isFavorite === false) {
      setIsFavorite(true);
      if (getItemLocalStorage === null) {
        const setToLocalStorage = [detailsDrink];
        localStorage.setItem('favoriteRecipes', JSON.stringify(setToLocalStorage));
      } else {
        const favoriteObj = [...getItemLocalStorage, detailsDrink];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObj));
      }
    }
    if (isFavorite) {
      setIsFavorite(false);
      const removedFavorite = getItemLocalStorage.filter((item) => item
        .id !== detailsDrink.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedFavorite));
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickShare }
      >
        <img
          src={ shareIcon }
          alt="share-icon"
          data-testid="share-btn"
        />
      </button>
      {pathname.includes('foods')
      && (
        <button
          type="button"
          onClick={ handleClickFavoriteFood }
        >
          {isFavorite ? (
            <img
              src={ blackHeartIcon }
              alt="heart-icon"
              data-testid="favorite-btn"
            />)
            : (
              <img
                src={ heartIcon }
                alt="heart-icon"
                data-testid="favorite-btn"
              />)}
        </button>)}
      {pathname.includes('drinks')
      && (
        <button
          type="button"
          onClick={ handleClickFavoriteDrink }
        >
          {isFavorite ? (
            <img
              src={ blackHeartIcon }
              alt="heart-icon"
              data-testid="favorite-btn"
            />)
            : (
              <img
                src={ heartIcon }
                alt="heart-icon"
                data-testid="favorite-btn"
              />)}
        </button>)}
      {clickedMessage && <span>Link copied!</span>}
    </div>
  );
}

export default RecipesDetailsIcons;
