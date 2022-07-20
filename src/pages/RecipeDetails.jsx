import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { requestFoodDetails, requestDrinkDetails } from '../endPoints/requestAPI';
import { Context } from '../context/Context';

function RecipeDetails(props) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { match: { params: { id } } } = props;
  const { setDetail, details } = useContext(Context);

  useEffect(() => {
    const Details = async () => {
      if (pathname.includes('/foods')) {
        const meal = await requestFoodDetails(id);
        setDetail(meal);
      }
      if (pathname.includes('/drinks')) {
        const drink = await requestDrinkDetails(id);
        setDetail(drink);
      }
    };
    Details();
  }, [pathname, id, props, setDetail]);

  return (
    <>
      {pathname.includes('foods')
    && (
      <div>
        <img
          src={ details?.meals[0].strMealThumb }
          alt="detail"
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{ details?.meals[0].strMeal }</p>
        <p data-testid="recipe-category">
          { details?.meals[0].strCategory }
        </p>
        <p data-testid="instructions">
          { details?.meals[0].strInstructions }
        </p>
      </div>)}
      {pathname.includes('drinks')
    && (
      <div>
        <img
          src={ details?.drinks[0].strDrinkThumb }
          alt="detail"
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">{ details?.drinks[0].strDrink }</p>
        <p data-testid="recipe-category">
          { details?.drinks[0].strCategory }
        </p>
        <p data-testid="instructions">
          { details?.drinks[0].strInstructions }
        </p>
      </div>)}
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default RecipeDetails;
