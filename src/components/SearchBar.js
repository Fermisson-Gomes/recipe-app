import React, { useContext } from 'react';
import { Context } from '../context/Context';
import {
  requestFirstLetter, requestFoodName,
  requestIngredient,
} from '../endPoints/requestAPI.js';

function SearchBar() {
  const {
    search,
    // setRequestIngredient,
    // ingredientIsMarked,
    // foodNameIsMarked,
    // firstLetterIsMarked,
    // setFirstLetterIsMarked,
    // setFoodNameIsMarked,
    // setIngredientIsMarked,
  } = useContext(Context);

  return (
    <div>
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="option"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          // onChange={  }

        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="option"
          id="name"
          data-testid="name-search-radio"
          onChange={ () => requestFoodName(search) }

        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="option"
          id="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ () => requestFirstLetter(search) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
