import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  const { str, strThumb, index, href, id } = props;
  // console.log(id);
  return (
    <Link
      data-testid={ `${index}-recipe-card` }
      to={ href }
      state={ id }
    >
      <p data-testid={ `${index}-card-name` }>
        { str }
      </p>
      <img
        src={ strThumb }
        data-testid={ `${index}-card-img` }
        alt={ str }

      />
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
