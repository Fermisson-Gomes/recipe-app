import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient">
        <input
          type="radio"
          name="option"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          name="option"
          id="name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="option"
          id="first-letter"
          data-testid="first-letter-search-radio"
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
