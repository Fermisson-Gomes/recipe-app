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
  const { setDetail, details, setIngredient, ingredient,
    setMeasure, measure } = useContext(Context);

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

  const handleClick = () => {
    history.push(`${id}/in-progress`);
  };

  useEffect(() => {
    if (details) {
      const ingredients = Object.entries(details?.meals[0])
        .filter((item) => item[0].includes('strIngredient'));
      const secondElementIng = ingredients.map((item) => item[1]);
      setIngredient(secondElementIng);
      const measures = Object.entries(details?.meals[0])
        .filter((item) => item[0].includes('strMeasure'));
      const secondElementMea = measures.map((item) => item[1]);
      setMeasure(secondElementMea);
    }
  }, [details, setIngredient, setMeasure]);

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
        <object width="425" height="350">
          <param name="movie" value={ details?.meals[0].strYoutube } />
          <embed
            src={ details?.meals[0].strYoutube }
            type="video/mp4"
            data-testid="video"
            width="425"
            height="350"
          />
        </object>
        <ul>
          {measure && measure.map((item, index) => (
            <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
              { item }
            </li>
          ))}
          {ingredient && ingredient.map((item, index) => (
            <li data-testid={ `${index}-ingredient-name-and-measure` } key={ item }>
              { item }
            </li>
          ))}
        </ul>
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
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          Start Recipe
        </button>

      </div>)}
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default RecipeDetails;
