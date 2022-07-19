import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  requestAllDrinks, requestAllFoods, requestCategoryDrink,
  requestCategoryFoods, requestDrinkButton, requestFoodButton,
} from '../endPoints/requestAPI';

export const Context = createContext();
function Provider({ children }) {
  const { push, location: { pathname } } = useHistory();
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });
  const [optionValue, setOptionValue] = useState('');
  const [responseFood, setResponseFood] = useState(null);
  const [responseDrink, setResponseDrink] = useState(null);
  const [search, setSearch] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [categoryMeal, setCategoryMeal] = useState();
  const [categoryDrink, setCategoryDrink] = useState();
  const [categoryButton, setCategoryButton] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setLoginState((old) => ({ ...old, [name]: value }));
  };
  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  useEffect(() => {
    const saveCategory = async () => {
      if (pathname === '/foods') {
        const apiFood = await requestFoodButton(categoryButton);
        setResponseFood(apiFood);
      }
      if (pathname === '/drinks') {
        const apiDrink = await requestDrinkButton(categoryButton);
        setResponseDrink(apiDrink);
      }
    };
    saveCategory();
  }, [categoryButton, pathname]);

  useEffect(() => {
    const requestCategories = async () => {
      const meal = await requestCategoryFoods();
      setCategoryMeal(meal);
      const drink = await requestCategoryDrink();
      setCategoryDrink(drink);
    };
    requestCategories();
  }, []);

  useEffect(() => {
    const ReqAPI = async () => {
      const responseMeal = await requestAllFoods();
      setResponseFood(responseMeal);
      const drinkResponse = await requestAllDrinks();
      setResponseDrink(drinkResponse);
    };
    ReqAPI();
  }, []);

  useEffect(() => {
    if (pathname === '/foods' && responseFood && responseFood.meals.length === 1) {
      const idMeals = responseFood.meals[0].idMeal;
      push(`/foods/${idMeals}`);
    }
    if (pathname === '/drinks' && responseDrink && responseDrink.drinks.length === 1) {
      const idDrinks = responseDrink.drinks[0].idDrink;
      push(`/drinks/${idDrinks}`);
    }
  }, [push, pathname, responseFood, responseDrink]);
  const contextValue = {
    loginState,
    handleChange,
    search,
    handleSearchChange,
    setOptionValue,
    optionValue,
    responseFood,
    setResponseFood,
    responseDrink,
    setResponseDrink,
    userEmail,
    setUserEmail,
    setLoginState,
    categoryDrink,
    categoryMeal,
    setCategoryButton,
    categoryButton,
  };
  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
export { Provider };
