import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { drinkDataFirstLetter, drinkDataIngredient, drinkDataName } from './mocks/searchMocks';

describe('testes do componente SearchBar', () => {
  it('testa se ao clicar no ícone de seach o input aparece', () => {
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

    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const foodName = screen.getByTestId(/name-search-radio/i);
    
    expect(ingredient).toBeVisible();
    expect(firstLetter).toBeVisible();
    expect(foodName).toBeVisible();
  });

  it('testa se os radio inputs estão funcionando', () => {
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

    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const foodName = screen.getByTestId(/name-search-radio/i);



    userEvent.click(ingredient);

    expect(ingredient).toHaveProperty('checked');

    userEvent.click(firstLetter);

    expect(firstLetter).toHaveProperty('checked');

    userEvent.click(foodName);

    expect(foodName).toHaveProperty('checked');
  })

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

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'orange');
    userEvent.click(ingredient);
    userEvent.click(execSearchBtn);

    // expect(global.fetch).toBeCalled();
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

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const foodName = screen.getByTestId(/name-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'orange');
    userEvent.click(foodName);
    userEvent.click(execSearchBtn);

    // expect(global.fetch).toBeCalled();
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

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'q');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);

    // expect(global.fetch).toBeCalled();
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
