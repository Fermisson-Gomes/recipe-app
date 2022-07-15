import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';


describe('testes da pagina de Login', () => {
  it('testa se a tela de login possui os inputs', () => {
    renderWithRouter(<App />)

    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  })

  it('testa se existe um botão na tela de login', () => {
    renderWithRouter(<App/>)

    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    expect(enterBtn).toBeInTheDocument();
  })
  it('testa se os inputs estão funcionando', () => {
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');

    expect(emailInput).toHaveValue('fermilson.gomes@gmail.com');
    expect(passwordInput).toHaveValue('fermilson');
  })
  it('testa se ao preencher os inputs corretamente o botão habilita', () => {
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');

    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    expect(enterBtn).toBeEnabled();
  })
  it('testa se ao preencher os inputs com dados invalidos o botão continua dasabilitado', () => {
    renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail');
    userEvent.type(passwordInput, 'fermi');

    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    expect(enterBtn).toBeDisabled();
  })

  it('testa se o botão de submit esta funcionando', () => {
    const {history} = renderWithRouter(<App/>)
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    userEvent.type(emailInput, 'fermilson.gomes@gmail.com');
    userEvent.type(passwordInput, 'fermilson');
    userEvent.click(enterBtn);

    expect(history.location.pathname).toBe('/foods');

  })
})