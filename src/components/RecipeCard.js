import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';

function RecipeCard() {
  const { response } = useContext(Context);
  // const twelve = 12;
  // const array = response.slice(0, twelve);
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  return (
    <div>
      {pathname.endsWith('foods') && response && response.meals.map((e, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <p>
            { e.strMeal }
          </p>
          <img
            src={ e.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ e.strMeal }
          />
        </div>
      ))}
      {pathname.endsWith('drinks') && response && response.drinks.map((e, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <p>
            { e.strDrink }
          </p>
          <img
            src={ e.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ e.strDrink }
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeCard;
