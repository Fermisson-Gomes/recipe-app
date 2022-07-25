import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonStartRecipe(props) {
  const history = useHistory();
  // const [btnText, setBtnText] = useState('');
  // const [isBtnVisible, setIsBtnVisible] = useState(true);
  const {
    location: { pathname },
  } = history;
  const { id } = props;

  // useEffect(() => {
  //   const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const mapgetDoneRecipes = getDoneRecipes.some((item) => item.id === id);
  //   const keysInProgressDrinks = Object.keys(getInProgressRecipes.cocktails);
  //   const keysInProgressFoods = Object.keys(getInProgressRecipes.meals);
  //   const mapKeysInProgressDrinks = keysInProgressDrinks.some((item) => item === id);
  //   const mapKeysInProgressFoods = keysInProgressFoods.some((item) => item === id);

  //   if (mapgetDoneRecipes) {
  //     setIsBtnVisible(false);
  //   } else if (!getInProgressRecipes) {
  //     setBtnText('Continue Recipe');
  //   } else {
  //     setBtnText('Start Recipe');
  //   }
  // });

  return (
    <>
      {pathname.includes('foods')
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
      {pathname.includes('drinks')
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
