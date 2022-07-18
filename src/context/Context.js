import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const [optionValue, setOptionValue] = useState('');

  const [response, setResponse] = useState(null);

  const [search, setSearch] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setLoginState((old) => ({ ...old, [name]: value }));
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const contextValue = {
    loginState,
    handleChange,
    search,
    handleSearchChange,
    setOptionValue,
    optionValue,
    response,
    setResponse,
  };
  const { push, location: { pathname } } = useHistory();

  useEffect(() => {
    if (pathname === '/foods' && response !== null && response.meals.length === 1) {
      const idMeals = response.meals[0].idMeal;
      push(`/foods/${idMeals}`);
    }

    if (pathname === '/drinks' && response !== null && response.drinks.length === 1) {
      const idDrinks = response.drinks[0].idDrink;
      push(`/drinks/${idDrinks}`);
    }
  }, [push, pathname, response]);

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
