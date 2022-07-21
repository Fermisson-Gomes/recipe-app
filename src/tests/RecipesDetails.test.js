import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes do componente RecipeDetails de comidas', () => {
  it('testa se ao clicar numa receita é redirecionado para a pagina de detalhes', async () => {
    const {history} = renderWithRouter(<App />);

    history.push('/foods');

    const corba = await screen.findByTestId('0-recipe-card');

    userEvent.click(corba);

    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('testa se um video é renderizado', async () => {
    const {history} = renderWithRouter(<App />);

    history.push('/foods');

    const corba = await screen.findByTestId('0-recipe-card');

    userEvent.click(corba);

    const video = await screen.findByTestId(/video/i);

    expect(video).toBeInTheDocument();
  })

  it('testa se a lista de ingredientes é renderizada', async () => {
    const {history} = renderWithRouter(<App />);

    history.push('/foods');

    const corba = await screen.findByTestId('0-recipe-card');

    userEvent.click(corba);

    const itemList = await screen.findAllByTestId('0-ingredient-name-and-measure');

    expect(itemList).toHaveLength(2);
  })
})

describe('testes do componente RecipeDetails de bebidas', () => {
  it('testa se ao clicar numa receita é redirecionado para a pagina de detalhes', async () => {
    const {history} = renderWithRouter(<App />);

    history.push('/drinks');

    const a1 = await screen.findByTestId('1-recipe-card');

    userEvent.click(a1);

    expect(history.location.pathname).toBe('/drinks/17222');
  });

  it('testa se a lista de ingredientes é renderizada', async () => {
    const {history} = renderWithRouter(<App />);

    history.push('/drinks');

    const a1 = await screen.findByTestId('1-recipe-card');

    userEvent.click(a1);

    const itemList = await screen.findAllByTestId('0-ingredient-name-and-measure');

    expect(itemList).toHaveLength(2);
  })

})
describe('teste do botão de iniciar receita', () => {
  it('testa se ao clicar no botão start recipe é redirecionado', async () => {
    const {history} = renderWithRouter(<App />);

    history.push('/foods');

    const corba = await screen.findByTestId('0-recipe-card');

    userEvent.click(corba);

    const startBtn = await screen.findByTestId(/start-recipe-btn/i);

    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/foods/52977/in-progress')
  })
})