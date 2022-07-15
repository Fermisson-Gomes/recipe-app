export const requestIngredient = async (ingrediente) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  console.log(data);
};

export const requestFoodName = async (nome) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const data = await fetch(endpoint).then((resp) => resp.json());
  console.log(data);
};

export const requestFirstLetter = async (primeiraLetra) => {
  if (primeiraLetra.length <= 1) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra};`;
    const request = await fetch(endpoint);
    const data = await request.json();
    console.log(data);
  } else {
    global.alert('Your search must have only 1 (one) character');
  }
};
