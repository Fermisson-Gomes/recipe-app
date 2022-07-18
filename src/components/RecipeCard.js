import React, { useContext } from 'react';
import { Context } from '../context/Context';

function RecipeCard() {
  const { response } = useContext(Context);

  return (
    <div>
      {response.map((e, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <p
            data-testid={ `${index}-card-name` }
          >
            { e.strMeal }
          </p>
          <img
            src={ e.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ e.strMeal }
          />
        </div>
      ))}
      ;
    </div>
  );
}

export default RecipeCard;
