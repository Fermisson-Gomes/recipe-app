import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('testes da página Profile', () => {
    it('testa se o header possui três botões', () => {
        renderWithRouter(<App/>)
        const emailInput = screen.getByTestId(/email-input/i);
        const passwordInput = screen.getByTestId(/password-input/i);
        const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
        userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
        userEvent.type(passwordInput, 'fermilson');
        userEvent.click(enterBtn);
    
        const profileBtn = screen.getByTestId(/profile-top-btn/i);
    
        userEvent.click(profileBtn);

        const doneBtn = screen.getByTestId('profile-done-btn');
        const favoriteBtn = screen.getByTestId('profile-favorite-btn');
        const logoutBtn = screen.getByTestId('profile-logout-btn');
    
        expect(doneBtn).toBeInTheDocument();
        expect(favoriteBtn).toBeInTheDocument();
        expect(logoutBtn).toBeInTheDocument();
    });
  
    it('testa se ao clicar no botão de "Done Recipes", redireciona para a página de "done-recipes"', () => {
      const {history} = renderWithRouter(<App/>)
      const emailInput = screen.getByTestId(/email-input/i);
      const passwordInput = screen.getByTestId(/password-input/i);
      const enterBtn = screen.getByTestId(/login-submit-btn/i);
  
      userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
      userEvent.type(passwordInput, 'fermilson');
      userEvent.click(enterBtn);

      const profileBtn = screen.getByTestId(/profile-top-btn/i);
      userEvent.click(profileBtn);
  
      const doneBtn = screen.getByTestId('profile-done-btn');
      userEvent.click(doneBtn);

      expect(history.location.pathname).toBe('/done-recipes');
    });

    it('testa se ao clicar no botão de "Favorite Recipes", redireciona para a página de "favorite-recipes"', () => {
        const {history} = renderWithRouter(<App/>)
        const emailInput = screen.getByTestId(/email-input/i);
        const passwordInput = screen.getByTestId(/password-input/i);
        const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
        userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
        userEvent.type(passwordInput, 'fermilson');
        userEvent.click(enterBtn);
  
        const profileBtn = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(profileBtn);
    
        const favoriteBtn = screen.getByTestId('profile-favorite-btn');
        userEvent.click(favoriteBtn);
  
        expect(history.location.pathname).toBe('/favorite-recipes');
      });

      it('testa se ao clicar no botão de "Logout", redireciona para a página de login', () => {
        const {history} = renderWithRouter(<App/>)
        const emailInput = screen.getByTestId(/email-input/i);
        const passwordInput = screen.getByTestId(/password-input/i);
        const enterBtn = screen.getByTestId(/login-submit-btn/i);
    
        userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
        userEvent.type(passwordInput, 'fermilson');
        userEvent.click(enterBtn);
  
        const profileBtn = screen.getByTestId(/profile-top-btn/i);
        userEvent.click(profileBtn);
    
        const logoutBtn = screen.getByTestId('profile-logout-btn');
        userEvent.click(logoutBtn);
  
        expect(history.location.pathname).toBe('/');
      });
  });
  