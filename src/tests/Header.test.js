import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('testes do componente Header', () => {
  it('testa se o header possui um botão que redireciona para o profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    const btn = screen.getByTestId(/profile-btn/i);

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/profile');
  });

  it('testa se ao clicar no ícone de seach o input aparece', () => {
    const {history} = renderWithRouter(<App/>)
    history.push('/foods')

    const searchBtn = screen.getByTestId(/search-top-btn/i);

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    expect(searchInput).toBeVisible();
  });

  it('testa se ao clicar no ícone de seach o input aparece e se ao clicar novamente, desaparece', () => {
    const {history} = renderWithRouter(<App/>)
    history.push('/foods')

    const searchBtn = screen.getByTestId(/search-top-btn/i);

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    expect(searchInput).toBeVisible();

    userEvent.click(searchBtn);

    expect(searchInput).not.toBeVisible();
  });

  it('testa se as demais paginas possuem seus respectivos titulos', () => {
    const {history} = renderWithRouter(<App/>)
    history.push('/foods')

    const btn = screen.getByTestId(/profile-btn/i);

    userEvent.click(btn);

    const title = screen.getByRole("heading");
    expect(title).toHaveTextContent(/profile/i);

    history.push('/drinks');

    const title2 = screen.getByRole("heading");

    expect(title2).toHaveTextContent(/drinks/i);

    history.push('/done-recipes');

    const title3 = screen.getByRole("heading");

    expect(title3).toHaveTextContent(/done recipes/i);

    history.push('/favorite-recipes');

    const title4 = screen.getByRole("heading");

    expect(title4).toHaveTextContent(/favorite recipes/i);
  })
});
