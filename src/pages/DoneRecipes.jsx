import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipesState, setDoneRecipesState] = useState();
  const [clickedMessageFav, setClickMessageFav] = useState(false);

  useEffect(() => {
    // localStorage.setItem('doneRecipes', JSON.stringify([
    //   {
    //     id: '15997',
    //     type: 'bebida',
    //     nationality: '',
    //     category: 'testedrink',
    //     alcoholicOrNot: 'testealcoolico',
    //     name: 'testando',
    //     image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    //     doneDate: 'hoje',
    //     tags: 'tags',
    //   },
    //   {
    //     id: '15996',
    //     type: 'comida',
    //     nationality: 'fdsaf',
    //     category: 'testefood',
    //     alcoholicOrNot: '',
    //     name: 'testando',
    //     image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
    //     doneDate: 'ontem',
    //     tags: 'tags',
    //   },
    // ]));
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipesState(doneRecipesLocalStorage);
  }, []);

  const handleClickShare = ({ target: { id, name } }) => {
    const twoSec = 2000;
    if (name === '') {
      const url = `http://localhost:3000/foods/${id}`;
      clipboardCopy(url);
      setClickMessageFav(true);
    }
    if (name !== '') {
      const url = `http://localhost:3000/drinks/${id}`;
      clipboardCopy(url);
      setClickMessageFav(true);
    }
    setTimeout(() => {
      setClickMessageFav(false);
    }, twoSec);
  };

  const handleClickFilter = (({ target: { value } }) => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (value === 'all') {
      setDoneRecipesState(doneRecipesLocalStorage);
    }
    if (value === 'foods') {
      const foods = doneRecipesLocalStorage.filter((item) => item.type === 'food');
      setDoneRecipesState(foods);
    }
    if (value === 'drinks') {
      const drinks = doneRecipesLocalStorage.filter((item) => item.type === 'drink');
      setDoneRecipesState(drinks);
    }
  });

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickFilter }
          value="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickFilter }
          value="foods"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickFilter }
          value="drinks"
        >
          Drinks
        </button>
      </div>
      <section>
        {doneRecipesState && doneRecipesState.map((item, index) => (
          <div key={ item.id }>
            {item.type === 'food' && (
              <>
                <a href={ `/foods/${item.id}` }>
                  <img
                    src={ item.image }
                    alt="imagem"
                    data-testid={ `${index}-horizontal-image` }
                    width={ 100 }
                  />
                </a>
                <a
                  href={ `/foods/${item.id}` }
                >
                  <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>

                </a>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { item.nationality }
                  {' '}
                  -
                  {' '}
                  { item.category }
                </p>
              </>
            )}
            {item.type === 'drink' && (
              <>
                <a href={ `/drinks/${item.id}` }>
                  <img
                    src={ item.image }
                    alt="imagem"
                    data-testid={ `${index}-horizontal-image` }
                    width={ 100 }
                  />
                </a>
                <a
                  href={ `/drinks/${item.id}` }
                >
                  <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
                </a>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { item.alcoholicOrNot }
                </p>
              </>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>
              { item.doneDate }
            </p>
            <button
              type="button"
              onClick={ handleClickShare }
            >
              <img
                src={ shareIcon }
                alt="share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
                id={ item.id }
                name={ item.alcoholicOrNot }
              />
            </button>

            {clickedMessageFav && <span>Link copied!</span>}
            <p data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }>
              { item.tags[0] }

            </p>
            <p data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }>
              { item.tags[1] }

            </p>
          </div>
        ))}
      </section>
    </>
  );
}

export default DoneRecipes;
