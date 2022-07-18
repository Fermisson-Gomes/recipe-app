import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { drinkDataFirstLetter, drinkDataIngredient, drinkDataName, foodDataFirstLetter, foodDataIngredient, foodDataName, foodDataOneRecipe } from './mocks/searchMocks';

describe('testes do componente SearchBar na pagina /foods', () => {
  it('testa se ao clicar no ícone de seach o input aparece', () => {
    const {history} = renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    expect(ingredient).toBeVisible();

    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    expect(firstLetter).toBeVisible();

    const foodName = screen.getByTestId(/name-search-radio/i);
    expect(foodName).toBeVisible();

    userEvent.click(searchBtn);

    expect(ingredient).not.toBeVisible();
    expect(firstLetter).not.toBeVisible();
    expect(foodName).not.toBeVisible();
  });

  it('testa se os radio inputs estão funcionando', () => {
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId(/ingredient-search-radio/i);

    userEvent.click(ingredient);

    expect(ingredient).toHaveProperty('checked');

    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(firstLetter);

    expect(firstLetter).toHaveProperty('checked');

    const foodName = screen.getByTestId(/name-search-radio/i);
    userEvent.click(foodName);

    expect(foodName).toHaveProperty('checked');
  })

  it('testa se ao clicar no botão search com a opção ingredient selecionada é feita a requisição a API correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodDataIngredient),
    });

    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredient);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  })
    
  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodDataName),
    });

    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const foodName = screen.getByTestId(/name-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(foodName);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
  })

  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodDataFirstLetter),
    });

    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'a');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  })

  it('testa se um alerta é disparado de uma pesquisa de primmeira letra for feita com mais de uma letra', () => {
    global.alert = jest.fn();
    
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'ab');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);

    expect(global.alert).toBeCalled();

  })

  // it('testa se caso a resposta da api possua apenas 1 receita a pagina é redirecionada para a receita', () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(foodDataOneRecipe),
  //   });

  //   const {history} = renderWithRouter(<App/>)
  //   const emailInput = screen.getByTestId(/email-input/i);
  //   const passwordInput = screen.getByTestId(/password-input/i);
  //   const enterBtn = screen.getByTestId(/login-submit-btn/i);

  //   userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
  //   userEvent.type(passwordInput, 'fermilson');
  //   userEvent.click(enterBtn);

  //   const searchBtn = screen.getByTestId(/search-top-btn/i);
  //   expect(searchBtn).toBeInTheDocument();

  //   userEvent.click(searchBtn);

  //   const searchInput = screen.getByTestId(/search-input/i);
  //   const foodName = screen.getByTestId(/name-search-radio/i);
  //   const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

  //   userEvent.type(searchInput, 'arrabiata');
  //   userEvent.click(foodName);
  //   userEvent.click(execSearchBtn);

  //   expect(history.location.pathname).toBeCalled();
  // })
});

describe('testes do componente SearchBar na pagina /drinks', () => {
  it('testa se ao clicar no botão search com a opção ingredient selecionada é feita a requisição a API correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkDataIngredient),
    });

    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const drinksBtn = screen.getByTestId(/drinks-bottom-btn/i);

    userEvent.click(drinksBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'orange');
    userEvent.click(ingredient);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=orange');
  })
    
  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkDataName),
    });

    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const drinksBtn = screen.getByTestId(/drinks-bottom-btn/i);

    userEvent.click(drinksBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const foodName = screen.getByTestId(/name-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'orange');
    userEvent.click(foodName);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=orange');
  })

  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkDataFirstLetter),
    });

    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const drinksBtn = screen.getByTestId(/drinks-bottom-btn/i);

    userEvent.click(drinksBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'q');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=q');
  })

  it('testa se um alerta é disparado de uma pesquisa de primmeira letra for feita com mais de uma letra', () => {
    global.alert = jest.fn();
    
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const drinksBtn = screen.getByTestId(/drinks-bottom-btn/i);

    userEvent.click(drinksBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'ab');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);

    expect(global.alert).toBeCalled();

  })
});
