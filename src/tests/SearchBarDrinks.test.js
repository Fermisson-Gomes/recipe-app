import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('testes do componente SearchBar', () => {
  it('testa se ao clicar no ícone de seach o input aparece', () => {
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks');

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
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks');

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

  it('testa se ao clicar no botão search com a opção ingredient selecionada o filtro funciona', async () => {
    
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks');
    
    const searchBtn = await screen.findByTestId(/search-top-btn/i);
    
    userEvent.click(searchBtn);
    
    const searchInput = await screen.findByTestId(/search-input/i);
    const ingredient = await screen.findByTestId(/ingredient-search-radio/i);
    const execSearchBtn = await screen.findByTestId(/exec-search-btn/i);
    
    userEvent.type(searchInput, 'orange');
    userEvent.click(ingredient);
    userEvent.click(execSearchBtn);

    const name = await screen.findByText(/abbey cocktail/i)

    expect(name).toBeInTheDocument();
    
     })
    
  it('testa se ao clicar no botão search com a opção name selecionada o filtro funciona', async () => {
    
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks');
    
    const searchBtn = await screen.findByTestId(/search-top-btn/i);
    
    userEvent.click(searchBtn);
    
    const searchInput = await screen.findByTestId(/search-input/i);
    const foodName = await screen.findByTestId(/name-search-radio/i);
    const execSearchBtn = await screen.findByTestId(/exec-search-btn/i);
    
    userEvent.type(searchInput, 'orange');
    userEvent.click(foodName);
    userEvent.click(execSearchBtn);
    
    expect(await screen.findByText(/orangeade/i)).toBeInTheDocument();
   })

  it('testa se ao clicar no botão search com a opção name selecionada é feita a requisição a API correta', async () => {
    
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks');
    
    const searchBtn = await screen.findByTestId(/search-top-btn/i);

    userEvent.click(searchBtn);

    const searchInput = await screen.findByTestId(/search-input/i);
    const firstLetter = await screen.findByTestId(/first-letter-search-radio/i);
    const execSearchBtn = await screen.findByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'q');
    userEvent.click(firstLetter);
    userEvent.click(execSearchBtn);

    expect(await screen.findByText(/quentin/i)).toBeInTheDocument();
    
  })

  it('testa se um alerta é disparado de uma pesquisa de primmeira letra for feita com mais de uma letra', () => {
    
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks');
    
    global.alert = jest.fn();
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

  it('testa se caso não existam receitas com o ingrediente um alerta é disparado', async () => {
    
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks')

    const searchBtn = await screen.findByTestId(/search-top-btn/i);

    userEvent.click(searchBtn);

    const searchInput = await screen.findByTestId(/search-input/i);
    const name = await screen.findByTestId(/name-search-radio/i);
    const execSearchBtn = await screen.findByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'vassoura');
    userEvent.click(name);
    userEvent.click(execSearchBtn);

    await waitFor(() => {expect(global.alert).toBeCalled();});
  })

  it('testa se caso venha apenas uma receita é redirecionado para a pagina de detalhes', async () => {
    const {history} = renderWithRouter(<App/>)

    history.push('/drinks')

    const searchBtn = await screen.findByTestId(/search-top-btn/i);

    userEvent.click(searchBtn);

    const searchInput = await screen.findByTestId(/search-input/i);
    const name = await screen.findByTestId(/name-search-radio/i);
    const execSearchBtn = await screen.findByTestId(/exec-search-btn/i);

    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(name);
    userEvent.click(execSearchBtn);

    const title = await screen.findByTestId(/recipe-title/i);

    await waitFor(() => {expect(title).toBeInTheDocument();});
  })
});
