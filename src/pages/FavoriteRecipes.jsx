import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [clickedMessageFav, setClickMessageFav] = useState(false);
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteLocalStorage);
  }, []);

  const handleClickShare = ({ target: { id, name } }) => {
    const twoSec = 2000;
    if (name === '') {
      const url = `http://localhost:3000/foods/${id}`;
      clipboardCopy(url);
      setClickMessageFav(true);
    }
    if (name !== '') {
      const url = `http://localhost:3000/drinks/${id}`;
      clipboardCopy(url);
      setClickMessageFav(true);
    }
    setTimeout(() => {
      setClickMessageFav(false);
    }, twoSec);
  };

  const handleClickFavorites = ({ target: { id } }) => {
    const removeFavorite = favorites?.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    setFavorites(removeFavorite);
  };

  return (
    <>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Foods</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <section>
        {favorites && favorites.map((item, index) => (
          <div key={ item }>
            <img
              src={ item.image }
              alt="imagem"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
            { item.type === 'meal' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { item.nationality }
                {' '}
                -
                {' '}
                { item.category }
              </p>)}
            { item.type === 'drink' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { item.alcoholicOrNot }
              </p>)}
            <p data-testid={ `${index}-horizontal-done-date` }>
              { new Date().toDateString() }
            </p>
            <button
              type="button"
              onClick={ handleClickShare }
            >
              <img
                src={ shareIcon }
                alt="share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
                id={ item.id }
                name={ item.alcoholicOrNot }
              />
            </button>
            <button
              type="button"
              onClick={ handleClickFavorites }
            >
              <img
                src={ blackHeartIcon }
                alt="favorite-icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
                id={ item.id }
              />
            </button>
            {clickedMessageFav && <span>Link copied!</span>}
            <p data-testid={ `${index}-${item.tag}-horizontal-tag` }>Tags</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default FavoriteRecipes;
