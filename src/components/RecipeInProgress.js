import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import RecipesDetailsIcons from './RecipesDetailsIcons';
import './RecipeInProgress.css';
import { requestDrinkDetails, requestFoodDetails } from '../endPoints/requestAPI';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { details, ingredient, checked, setChecked,
    setDetail, setIngredient, setMeasure } = useContext(Context);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('checklist'));
    setChecked(storage);
  }, []);

  useEffect(() => {
    if (details && pathname.includes('foods')) {
      const ingredients = Object.entries(details?.meals[0])
        .filter((item) => item[0].includes('strIngredient'));
      const secondElementIng = ingredients.map((item) => item[1]);
      setIngredient(secondElementIng);
      const measures = Object.entries(details?.meals[0])
        .filter((item) => item[0].includes('strMeasure'));
      const secondElementMea = measures.map((item) => item[1]);
      setMeasure(secondElementMea);
    }
    if (details && pathname.includes('/drinks')) {
      const ingredients = Object.entries(details?.drinks[0])
        .filter((item) => item[0].includes('strIngredient'));
      const secondElementIng = ingredients.map((item) => item[1]);
      setIngredient(secondElementIng);
      const measures = Object.entries(details?.drinks[0])
        .filter((item) => item[0].includes('strMeasure'));
      const secondElementMea = measures.map((item) => item[1]);
      setMeasure(secondElementMea);
    }
  }, [details, setIngredient, setMeasure, pathname]);

  useEffect(() => {
    const path = pathname.split('/');
    console.log(path);
    const Details = async () => {
      if (pathname.includes('/foods')) {
        const meal = await requestFoodDetails(path[2]);
        setDetail(meal);
      }
      if (pathname.includes('/drinks')) {
        const drink = await requestDrinkDetails(path[2]);
        setDetail(drink);
      }
    };
    Details();
  }, [pathname]);

  const isChecked = (item) => (checked.includes(item)
    ? 'checked-item' : 'not-checked-item');

  const handleCheck = ({ target }) => {
    const updatedList = [...checked, target.value];
    if (target.checked) {
      const list = checked.filter((item) => target.value !== item);
      setChecked(list);
      localStorage.setItem('checklist', JSON.stringify(list));
    } else {
      updatedList.splice(checked.indexOf(target.value), 1);
      setChecked(updatedList);
      localStorage.setItem('checklist', JSON.stringify(updatedList));
    }
  };

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
            <p data-testid="recipe-title">{details?.meals[0].strMeal}</p>
            <p data-testid="recipe-category">
              {details?.meals[0].strCategory}
            </p>
            <RecipesDetailsIcons />
            <p data-testid="instructions">
              {details?.meals[0].strInstructions}
            </p>
            <div className="ingList">
              {ingredient && ingredient.filter((n) => n).map((item, index) => (
                <div
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                >
                  <input value={ item } type="checkbox" onChange={ handleCheck } />
                  <span className={ isChecked(item) }>{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/done-recipes') }
            // disabled={}
            >
              Finalizar

            </button>
            {' '}

          </div>)}
      {' '}
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
          { details?.drinks[0].strAlcoholic }
        </p>
        <RecipesDetailsIcons />
        <p data-testid="instructions">
          { details?.drinks[0].strInstructions }
        </p>
        <div>
          {ingredient && ingredient.filter((n) => n).map((item, index) => (
            <div
              data-testid={ `${index}-ingredient-step` }
              key={ index }
            >
              <input value={ item } type="checkbox" onChange={ handleCheck } />
              <span className={ isChecked(item) }>{item}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Finalizar

        </button>
      </div>)}
    </>);
}

export default RecipeInProgress;
