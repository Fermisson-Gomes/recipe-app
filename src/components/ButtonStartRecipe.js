import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonStartRecipe(props) {
  const history = useHistory();
  // const [btnText, setBtnText] = useState('');
  const [isBtnVisible, setIsBtnVisible] = useState(true);
  const {
    location: { pathname },
  } = history;
  const { id } = props;

  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify([{
    //   id: '52771',
    //   type: 'food',
    //   nationality: 'Italian',
    //   category: 'Vegetarian',
    //   alcoholicOrNot: '',
    //   name: 'Spicy Arrabiata Penne',
    //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //   doneDate: '22/6/2020',
    //   tags: ['Pasta', 'Curry'],
    // },
    // {
    //   id: '178319',
    //   type: 'drink',
    //   nationality: '',
    //   category: 'Cocktail',
    //   alcoholicOrNot: 'Alcoholic',
    //   name: 'Aquamarine',
    //   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //   doneDate: '23/6/2020',
    //   tags: [],
    // },
    // ]));
    // localStorage.setItem('inProgressRecipes', JSON.stringify({
    //   cocktails: {
    //     78319: [],
    //   },
    //   meals: {
    //     52771: [],
    //   },
    // }));
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (getDoneRecipes) {
      const mapgetDoneRecipes = getDoneRecipes.some((item) => item.id === id);
      setIsBtnVisible(!mapgetDoneRecipes);
    }
    // if (getInProgressRecipes) {
    //   const keysInProgressDrinks = Object.keys(getInProgressRecipes.cocktails);
    //   const keysInProgressFoods = Object.keys(getInProgressRecipes.meals);
    //   const mapKeysInProgressDrinks = keysInProgressDrinks.some((item) => item === id);
    //   const mapKeysInProgressFoods = keysInProgressFoods.some((item) => item === id);
    //   if (mapKeysInProgressDrinks || mapKeysInProgressFoods) {
    //     setBtnText('Continue recipe');
    //   } else {
    //     setBtnText('Start recipe');
    //   }
    // }
  }, [id]);

  return (
    <>
      {pathname.includes('foods') && isBtnVisible
    && (
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        id={ id }
        onClick={ () => { history.push(`/foods/${id}/in-progress`); } }
      >
        Start Recipe
      </button>
    )}
      {pathname.includes('drinks') && isBtnVisible
    && (
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        id={ id }
        onClick={ () => { history.push(`/drinks/${id}/in-progress`); } }
      >
        Start Recipe
      </button>
    )}
    </>
  );
}

ButtonStartRecipe.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ButtonStartRecipe;
