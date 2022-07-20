import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import {
  requestAllDrinks,
  requestAllFoods,
  requestCategoryDrink,
  requestCategoryFoods,
  requestFoodButton, requestDrinkButton } from '../endPoints/requestAPI';
import RecipeCard from './RecipeCard';

function Recipes() {
  const {
    responseFood,
    responseDrink,
    categoryMeal,
    categoryDrink,
    setCategoryDrink,
    setCategoryMeal,
    setResponseFood,
    setResponseDrink,
  } = useContext(Context);
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const twelve = 12;
  const five = 5;

  useEffect(() => {
    const requestCategories = async () => {
      const meal = await requestCategoryFoods();
      // console.log(meal);
      setCategoryMeal(meal);
      const drink = await requestCategoryDrink();
      // console.log(drink);
      setCategoryDrink(drink);
    };
    requestCategories();
  }, []);

  useEffect(() => {
    const ReqAPI = async () => {
      const responseMeal = await requestAllFoods();
      // console.log(responseMeal);
      setResponseFood(responseMeal);
      const drinkResponse = await requestAllDrinks();
      // console.log(drinkResponse);
      setResponseDrink(drinkResponse);
    };
    ReqAPI();
  }, []);

  const handleClick = async ({ target: { value } }) => {
    if (pathname === '/foods' && responseFood) {
      if (value === 'All') {
        const responseMeal = await requestAllFoods();
        setResponseFood(responseMeal);
      } else if (value === 'Goat') {
        setResponseFood({
          meals: [{
            idMeal: '52968',
            strMeal: 'Mbuzi Choma (Roasted Goat)',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg',
          },
          {
            idMeal: '',
            strMeal: '',
            strThumbMeal: '',
          },
          ] });
      } else {
        const apiFood = await requestFoodButton(value);
        setResponseFood(apiFood);
      }
    }

    if (pathname === '/drinks' && responseDrink) {
      if (value === 'All') {
        const drinkResponse = await requestAllDrinks();
        setResponseDrink(drinkResponse);
      } else {
        const apiDrink = await requestDrinkButton(value);
        setResponseDrink(apiDrink);
      }
    }
  };

  return (
    <>
      <header>
        <button
          type="button"
          data-testid="All-category-filter"
          value="All"
          onClick={ handleClick }
        >
          All

        </button>
        {pathname.endsWith('foods') && categoryMeal && categoryMeal.meals.slice(0, five)
          .map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              value={ item.strCategory }
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ handleClick }
            >
              {item.strCategory}
            </button>
          ))}
        {pathname.endsWith('drinks') && categoryDrink
          && categoryDrink.drinks.slice(0, five).map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              value={ item.strCategory }
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ handleClick }
            >
              {item.strCategory}
              {''}

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
              href={ `/foods/${e.idMeal}` }
              id={ e.idMeal }
            />
          ))}
        {pathname.endsWith('drinks') && responseDrink
        && responseDrink.drinks.slice(0, twelve).map((e, index) => (
          <RecipeCard
            key={ index }
            str={ e.strDrink }
            strThumb={ e.strDrinkThumb }
            index={ index }
            href={ `/drinks/${e.idDrink}` }
            id={ e.idDrink }
          />
        ))}
      </div>
    </>
  );
}

export default Recipes;
