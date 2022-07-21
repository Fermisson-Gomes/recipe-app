import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import heartIcon from '../images/whiteHeartIcon.svg';
import heartBlackIcon from '../images/blackHeartIcon.svg';
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

  const handleClick = () => {
    const url = `http://localhost:3000${pathname}`;
    const twoSec = 2000;
    clipboardCopy(url);
    setClickMessage(true);
    setTimeout(() => {
      setClickMessage(false);
    }, twoSec);
  };

  const handleClickFavorite = () => {
    const detailsMeal = {
      id: details.meals[0].idMeal,
      type: 'meal',
      nationality: details.meals[0].strArea,
      category: details.meals[0].strCategory,
      alcoholicOrNot: '',
      name: details.meals[0].strMeal,
      image: details.meals[0].strMealThumb,
    };
    const getItemLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(getItemLocalStorage);

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

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ shareIcon }
          alt="share-icon"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        onClick={ handleClickFavorite }
      >
        {isFavorite ? (
          <img
            src={ heartBlackIcon }
            alt="heart-icon"
            data-testid="favorite-btn"
          />)
          : (
            <img
              src={ heartIcon }
              alt="heart-icon"
              data-testid="favorite-btn"
            />)}
      </button>
      {clickedMessage && <span>Link copied!</span>}
    </div>
  );
}

export default RecipesDetailsIcons;
