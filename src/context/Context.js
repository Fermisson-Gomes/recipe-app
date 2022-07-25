import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

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
  const [categoryMeal, setCategoryMeal] = useState();
  const [categoryDrink, setCategoryDrink] = useState();
  const [details, setDetail] = useState();
  const [ingredient, setIngredient] = useState();
  const [measure, setMeasure] = useState();
  const [checked, setChecked] = useState([]);
  const [disable, setDisable] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLoginState((old) => ({ ...old, [name]: value }));
  };
  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

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
    setLoginState,
    categoryDrink,
    categoryMeal,
    setCategoryDrink,
    setCategoryMeal,
    setDetail,
    details,
    setMeasure,
    measure,
    ingredient,
    setIngredient,
    checked,
    setChecked,
    disable,
    setDisable,
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
