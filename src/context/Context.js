import React, { createContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const [responseIngredient, setResponseIngredient] = useState([]);
  const [responseFoodName, setResponseFoodName] = useState([]);
  const [responseFirstLetter, setResponseFirstLetter] = useState([]);
  const [ingredientIsMarked, setIngredientIsMarked] = useState(false);
  const [foodNameIsMarked, setFoodNameIsMarked] = useState(false);
  const [firstLetterIsMarked, setFirstLetterIsMarked] = useState(false);

  const [search, setSearch] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setLoginState((old) => ({ ...old, [name]: value }));
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  // useEffect(() => {
  // const requestIngredient = async () => {
  // const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
  // const data = await fetch(endpoint).then((resp) => resp.json());
  // setResponseIngredient(data.meals);
  // };
  // requestIngredient();
  // }, []);

  // useEffect(() => {
  // const requestFoodName = async () => {
  // const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  // const data = await fetch(endpoint).then((resp) => resp.json());
  // setResponseFoodName(data.meals);
  // };
  // requestFoodName();
  // }, []);

  // useEffect(() => {
  // const requestFirstLetter = async (primeiraLetra) => {
  // if (primeiraLetra.length <= 1) {
  // const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra};`;
  // const request = await fetch(endpoint);
  // const data = await request.json();
  // setResponseFirstLetter(data.meals);
  // } else {
  // global.alert('Your search must have only 1 (one) character');
  // }
  // };
  // requestFirstLetter(search);
  // }, []);

  const contextValue = {
    loginState,
    handleChange,
    search,
    handleSearchChange,
    responseIngredient,
    responseFoodName,
    responseFirstLetter,
    ingredientIsMarked,
    foodNameIsMarked,
    firstLetterIsMarked,
    setFirstLetterIsMarked,
    setFoodNameIsMarked,
    setIngredientIsMarked,
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
