import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('testes do componente Footer', () => {
    it('testa se o header possui dois ícones', () => {
        renderWithRouter(<App/>)
        const emailInput = screen.getByTestId(/email-input/i);
        const passwordInput = screen.getByTestId(/password-input/i);
        const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
        userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
        userEvent.type(passwordInput, 'fermilson');
        userEvent.click(enterBtn);
    
        const searchBtn = screen.getByTestId(/search-top-btn/i);
    
        userEvent.click(searchBtn);
    
        const drinksBtn = screen.getByTestId(/drinks-bottom-btn/i);
        const foodBtn = screen.getByTestId(/food-bottom-btn/i);
        expect(drinksBtn).toBeInTheDocument();
        expect(foodBtn).toBeInTheDocument();
    });
  
    it('testa se ao clicar no ícone de drinks, redireciona para a página de drinks', () => {
      const {history} = renderWithRouter(<App/>)
      const emailInput = screen.getByTestId(/email-input/i);
      const passwordInput = screen.getByTestId(/password-input/i);
      const enterBtn = screen.getByTestId(/login-submit-btn/i);
  
      userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
      userEvent.type(passwordInput, 'fermilson');
      userEvent.click(enterBtn);
  
      const drinksBtn = screen.getByTestId(/drinks-bottom-btn/i);
      userEvent.click(drinksBtn);

      expect(history.location.pathname).toBe('/drinks');
    });
  
    it('testa se ao clicar no ícone de foods, redireciona para a página de foods', () => {
        const {history} = renderWithRouter(<App/>)
        const emailInput = screen.getByTestId(/email-input/i);
        const passwordInput = screen.getByTestId(/password-input/i);
        const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
        userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
        userEvent.type(passwordInput, 'fermilson');
        userEvent.click(enterBtn);
    
        const drinksBtn = screen.getByTestId(/food-bottom-btn/i);
        userEvent.click(drinksBtn);
  
        expect(history.location.pathname).toBe('/foods');
      });
  });
  