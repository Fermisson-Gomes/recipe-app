import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonStartRecipe(props) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { id } = props;
  //   const [isButtonVisible, setIsButtonVisible] = useState(true);

  //   useEffect(() => {
  //     const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));

  //     if (pathname.includes('/foods') && doneRecipe) {
  //       const findIdRecipe = doneRecipe.some((item) => item.id === id);
  //       console.log(findIdRecipe);
  //       setIsButtonVisible(!findIdRecipe);
  //     }
  //     if (pathname.includes('/drinks') && doneRecipe) {
  //       const findIdRecipe = doneRecipe.some((item) => item.idDrink === id);
  //       setIsButtonVisible(!findIdRecipe);
  //     }
  //   }, [pathname, setIsButtonVisible, id]);

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
