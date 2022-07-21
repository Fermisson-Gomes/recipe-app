import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import {
  requestFirstLetter, requestFoodName,
  requestIngredient, requestIngredientDrinks, requestDrinkName, requestFirstLetterDrinks,
} from '../endPoints/requestAPI';
import './SearchBar.css';

function SearchBar() {
  const history = useHistory();
  const {
    search,
    optionValue,
    setOptionValue,
    setResponseFood,
    setResponseDrink,
  } = useContext(Context);

  const handleClick = async () => {
    const { location: { pathname } } = history;

    if (pathname === '/foods') {
      const requests = {
        ingredient: requestIngredient,
        foodName: requestFoodName,
        firstLetter: requestFirstLetter,
      };
      const response = await requests[optionValue](search);

      setResponseFood(response);
    }
    if (pathname === '/drinks') {
      // console.log(search);
      const requests = {
        ingredient: requestIngredientDrinks,
        foodName: requestDrinkName,
        firstLetter: requestFirstLetterDrinks,
      };
      const response = await requests[optionValue](search);
      // console.log(response);
      setResponseDrink(response);
    }
  };

  return (
    <div className="search-bar">
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="option"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target: { value } }) => setOptionValue(value) }

        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="option"
          id="name"
          value="foodName"
          data-testid="name-search-radio"
          onChange={ ({ target: { value } }) => setOptionValue(value) }

        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="option"
          value="firstLetter"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => setOptionValue(value) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
