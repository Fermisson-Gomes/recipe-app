import PropTypes from 'prop-types';
import React from 'react';

function RecipeCard(props) {
  const { str, strThumb, index, href } = props;
  return (
    <a
      data-testid={ `${index}-recipe-card` }
      href={ href }
    >
      <p data-testid={ `${index}-card-name` }>
        { str }
      </p>
      <img
        src={ strThumb }
        data-testid={ `${index}-card-img` }
        alt={ str }
      />
    </a>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default RecipeCard;
