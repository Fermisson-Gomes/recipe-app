import React from 'react';
import heartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipesDetailsIcons() {
  return (
    <div>

      <button
        type="button"
        onClick={ () => { } }
      >
        <img
          src={ shareIcon }
          alt="share-icon"
          data-testid="share-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => { } }
      >
        <img
          src={ heartIcon }
          alt="heart-icon"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

export default RecipesDetailsIcons;
