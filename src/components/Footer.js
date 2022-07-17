import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer" data-testid="footer">
      <button
        type="button"
        onClick={ () => { history.push('/drinks'); } }
        className="footer-icon"
      >
        <img
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ () => { history.push('/foods'); } }
        className="footer-icon"
      >
        <img
          src={ mealIcon }
          alt="meal-icon"
          data-testid="food-bottom-btn"
        />
      </button>

    </footer>
  );
}

export default Footer;
