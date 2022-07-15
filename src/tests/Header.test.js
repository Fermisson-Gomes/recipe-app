import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';


describe('testes da pagina de Login', () => {
  it('testa se o header possui um botão que redireciona para o profile', () => {
    const {history} = renderWithRouter(<Foods/>)

    const btn = screen.getByTestId(/profile-btn/i);
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/profile');
  })
})