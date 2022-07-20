import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { foodData, foodDataFirstLetter, foodDataIngredient, foodDataName, foodDataNull, foodDataOneRecipe } from './mocks/searchMocks';
import { categoryFoodsMock } from './mocks/categoryMock';

describe('testes do componente SearchBar na pagina "/foods"', () => {
  it('testa se ao clicar no ícone de seach o input aparece', () => {
    renderWithRouter(<App/>)
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryFoodsMock),
    });
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodData),
    });

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
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryFoodsMock),
    });
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodData),
    });

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
    
    renderWithRouter(<App/>)
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryFoodsMock),
    });
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodData),
    });
    
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    
    userEvent.click(searchBtn);
    
    const searchInput = screen.getByTestId(/search-input/i);
    const ingredient = screen.getByTestId(/ingredient-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);
    
    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredient);
    userEvent.click(execSearchBtn);
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodDataIngredient),
    });
    // expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  })

  // it('testa se caso não existam receitas com o ingrediente um alerta é disparado', () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(foodDataNull),
  //   });
  //   global.alert = jest.fn();

  //   renderWithRouter(<App/>)
  //   const emailInput = screen.getByTestId(/email-input/i);
  //   const passwordInput = screen.getByTestId(/password-input/i);
  //   const enterBtn = screen.getByTestId(/login-submit-btn/i);

  //   userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
  //   userEvent.type(passwordInput, 'fermilson');
  //   userEvent.click(enterBtn);

  //   const searchBtn = screen.getByTestId(/search-top-btn/i);

  //   userEvent.click(searchBtn);

  //   const searchInput = screen.getByTestId(/search-input/i);
  //   const ingredient = screen.getByTestId(/ingredient-search-radio/i);
  //   const execSearchBtn = screen.getByTestId(/exec-search-btn/i);

  //   userEvent.type(searchInput, 'fish');
  //   userEvent.click(ingredient);
  //   userEvent.click(execSearchBtn);

  //   expect(global.alert).toBeCalled();
  // })
    
  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    
    renderWithRouter(<App/>)
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryFoodsMock),
    });
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    
    userEvent.click(searchBtn);
    
    const searchInput = screen.getByTestId(/search-input/i);
    const foodName = screen.getByTestId(/name-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);
    
    userEvent.type(searchInput, 'chicken');
    userEvent.click(foodName);
    userEvent.click(execSearchBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodDataName),
    });
    // expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
  })

  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    
    renderWithRouter(<App/>)
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoryFoodsMock),
    });
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodData),
    });
    
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    
    userEvent.click(searchBtn);
    
    const searchInput = screen.getByTestId(/search-input/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const execSearchBtn = screen.getByTestId(/exec-search-btn/i);
    
    userEvent.type(searchInput, 'a');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(foodDataFirstLetter),
    });
    // expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  })

  // it('testa se um alerta é disparado de uma pesquisa de primmeira letra for feita com mais de uma letra', () => {
    
  //   renderWithRouter(<App/>)
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(categoryFoodsMock),
  //   });
  //   const emailInput = screen.getByTestId(/email-input/i);
  //   const passwordInput = screen.getByTestId(/password-input/i);
  //   const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
  //   userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
  //   userEvent.type(passwordInput, 'fermilson');
  //   userEvent.click(enterBtn);

  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(foodData),
  //   });
    
  //   const searchBtn = screen.getByTestId(/search-top-btn/i);
    
  //   userEvent.click(searchBtn);
    
  //   const searchInput = screen.getByTestId(/search-input/i);
  //   const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
  //   const execSearchBtn = screen.getByTestId(/exec-search-btn/i);
    
  //   userEvent.type(searchInput, 'ab');
  //   userEvent.click(firstLetter);
  //   userEvent.click(execSearchBtn);

  //   global.alert = jest.fn();

  //   expect(global.alert).toBeCalled();

  // })

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
