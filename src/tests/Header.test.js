import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes da pagina de Login', () => {
  it('testa se o header possui um botão que redireciona para o profile', () => {
    const { history } = renderWithRouter(<Foods />);

    const btn = screen.getByTestId(/profile-btn/i);
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
    expect(history.location.pathname).toBe('/profile');
  });

  // it('testa se ao clicar no ícone de seach o input aparece e se ao clicar novamente, desaparece', () => {
  //   renderWithRouter(<Foods />);

  //   const btnSearch = screen.queryByTestId(/search-top-btn/i);
  //   expect(btnSearch).toBeInTheDocument();

  //   // userEvent.click(btn);
  //   // expect(history.location.pathname).toBe('/profile');
  // });
});
