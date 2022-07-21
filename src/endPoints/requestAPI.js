const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export const requestIngredient = async (ingrediente) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  if (data.meals === null) {
    global.alert(alert);
    return null;
  }
  return data;
};

export const requestFoodName = async (nome) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  if (data.meals === null) {
    global.alert(alert);
    return null;
  }
  return data;
};

export const requestFirstLetter = async (primeiraLetra) => {
  console.log(primeiraLetra);
  if (primeiraLetra.length === 1) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
    const request = await fetch(endpoint);
    const data = await request.json();
    return data;
  }
  global.alert('Your search must have only 1 (one) character');
};

export const requestIngredientDrinks = async (ingrediente) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const request = await fetch(endpoint);
  const data = await request.json();
  if (data.drinks === null) {
    global.alert(alert);
    return null;
  }
  return data;
};

export const requestDrinkName = async (nome) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  if (data.drinks === null) {
    global.alert(alert);
    return null;
  }
  return data;
};

export const requestFirstLetterDrinks = async (primeiraLetra) => {
  if (primeiraLetra.length === 1) {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
    const request = await fetch(endpoint);
    const data = await request.json();
    return data;
  }
  global.alert('Your search must have only 1 (one) character');
};

export const requestAllFoods = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};

export const requestAllDrinks = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};

export const requestCategoryFoods = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};

export const requestCategoryDrink = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};

export const requestFoodButton = async (category) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};

export const requestDrinkButton = async (category) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};

export const requestDrinkDetails = async (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};
export const requestFoodDetails = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  return data;
};
