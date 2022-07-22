import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const element = [0, 1, 2];
  const tagName = 'tag';
  return (
    <>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Foods</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <section>
        {element.map((item, index) => (
          <div key={ item }>
            <img src="imagem" alt="imagem" data-testid={ `${index}-horizontal-image` } />
            <p data-testid={ `${index}-horizontal-name` }>Name</p>
            <p data-testid={ `${index}-horizontal-top-text` }>Category</p>
            <p data-testid={ `${index}-horizontal-done-date` }>Date</p>
            <button
              type="button"
            >
              <img
                src={ shareIcon }
                alt="share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              type="button"
            >
              <img
                src={ blackHeartIcon }
                alt="favorite-icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            <p data-testid={ `${index}-${tagName}-horizontal-tag` }>Tags</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default FavoriteRecipes;
