const {
  categoryFoodsMock,
  categoryDrinksMock,
  categoryFoodBreakfast,
  categoryDrinkCocoa,
  categoryFoodGoat,
} = require("./mocks/categoryMock");
const { recipeONE, drinkRecipeONE } = require("./mocks/RecipeMock");
const {
  foodDataIngredient,
  drinkDataIngredient,
  foodDataOneRecipe,
  drinkData,
  foodData,
  drinkDataNull,
  drinkDataOneRecipe,
} = require("./mocks/searchMocks");

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      return Promise.resolve(categoryFoodsMock);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      return Promise.resolve(categoryDrinksMock);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    //   return Promise.resolve(mealIngredients);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken')
      return Promise.resolve(foodDataIngredient);

    // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    //   return Promise.resolve(drinkIngredients);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Orange')
      return Promise.resolve(drinkDataIngredient);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    //   return Promise.resolve(areas);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese')
    //   return Promise.resolve(japaneseMeals);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian')
    //   return Promise.resolve(italianMeals);

    if (
      url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata' ||
      url === 'https://www.themealdb.com/api/json/v1/1/random.php' ||
      url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
    )
      return Promise.resolve(foodDataOneRecipe);

    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977')
      return Promise.resolve(recipeONE);

    if (
      url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine' ||
      url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php' ||
      url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
    )
      return Promise.resolve(drinkDataOneRecipe);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222')
      return Promise.resolve(drinkRecipeONE);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup')
    //   return Promise.resolve(soupMeals);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef')
    //   return Promise.resolve(beefMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast')
      return Promise.resolve(categoryFoodBreakfast);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken')
    //   return Promise.resolve(chickenMeals);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
    //   return Promise.resolve(dessertMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat')
      return Promise.resolve(categoryFoodGoat);

    // if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau')
    //   return Promise.resolve(emptyMeals);

    // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin')
    //   return Promise.resolve(ginDrinks);

    // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink')
    //   return Promise.resolve(ordinaryDrinks);

    // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    //   return Promise.resolve(cocktailDrinks);

    // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake')
    //   return Promise.resolve(milkDrinks);

    // if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown')
    //   return Promise.resolve(otherDrinks);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa')
      return Promise.resolve(categoryDrinkCocoa);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vassoura'
    || url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vassoura')
      return Promise.resolve(drinkDataNull);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      return Promise.resolve(drinkData);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=')
      return Promise.resolve(foodData);

    return Promise.reject(new Error('Invalid url'));
  },
});

module.exports = fetch;