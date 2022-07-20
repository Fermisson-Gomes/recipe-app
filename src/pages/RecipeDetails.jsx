import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { requestFoodDetails, requestDrinkDetails } from '../endPoints/requestAPI';

function RecipeDetails(props) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const Details = async () => {
      if (pathname.includes('/foods')) {
        await requestFoodDetails(id);
      }
      if (pathname.includes('/drinks')) {
        await requestDrinkDetails(id);
      }
    };
    Details();
  }, [pathname, id, props]);

  return (
    <h1>Foods Id</h1>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default RecipeDetails;
