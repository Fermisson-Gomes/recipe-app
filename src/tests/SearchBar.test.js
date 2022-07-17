import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('testes do componente SearchBar', () => {
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
});
