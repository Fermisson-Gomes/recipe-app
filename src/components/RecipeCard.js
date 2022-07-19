import PropTypes from 'prop-types';
import React from 'react';

function RecipeCard(props) {
  const { str, strThumb, index } = props;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <p data-testid={ `${index}-card-name` }>
        { str }
      </p>
      <img
        src={ strThumb }
        data-testid={ `${index}-card-img` }
        alt={ str }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
};

export default RecipeCard;
