import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { responseFood, responseDrink,
    categoryMeal, categoryDrink } = useContext(Context);
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const twelve = 12;
  const five = 5;
  return (
    <>
      <header>
        {pathname.endsWith('foods') && categoryMeal && categoryMeal.meals.slice(0, five)
          .map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
            >
              {item.strCategory}
            </button>
          ))}
        {pathname.endsWith('drinks') && categoryDrink
          && categoryDrink.drinks.slice(0, five).map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
            >
              {item.strCategory}

            </button>
          ))}
      </header>
      <div>
        {pathname.endsWith('foods') && responseFood && responseFood.meals.slice(0, twelve)
          .map((e, index) => (
            <RecipeCard
              key={ index }
              str={ e.strMeal }
              strThumb={ e.strMealThumb }
              index={ index }
            />
          ))}
        {pathname.endsWith('drinks') && responseDrink
        && responseDrink.drinks.slice(0, twelve).map((e, index) => (
          <RecipeCard
            key={ index }
            str={ e.strDrink }
            strThumb={ e.strDrinkThumb }
            index={ index }
          />
        ))}
      </div>
    </>
  );
}

export default Recipes;
