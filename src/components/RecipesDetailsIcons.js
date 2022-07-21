import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import heartIcon from '../images/whiteHeartIcon.svg';
import heartBlackIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipesDetailsIcons() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [isFavorite, setIsFavorite] = useState(false);
  const [clickedMessage, setClickMessage] = useState();

  const handleClick = () => {
    const url = `http://localhost:3000${pathname}`;
    const twoSec = 2000;
    clipboardCopy(url);
    setClickMessage(true);
    setTimeout(() => {
      setClickMessage(false);
    }, twoSec);
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
        onClick={ () => { setIsFavorite(!isFavorite); } }
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
