import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testes do componente recipes da pagina /foods', () => {
  it('testa se os botões de filtro são renderizados', async () => {
    const {history} = renderWithRouter(<App />)

    history.push('/foods');

    const goatBtn = await screen.findByTestId(/goat-category-filter/i);
    const allBtn = await screen.findByTestId(/all-category-filter/i);

    expect(goatBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  })

  it('testa se os filtros estão funcionando', async () => {
    const {history} = renderWithRouter(<App />)

    history.push('/foods');

    const allBtn = await screen.findByTestId(/all-category-filter/i);
    const goatBtn = await screen.findByTestId(/goat-category-filter/i);
    const breakfastBtn = await screen.findByTestId(/breakfast-category-filter/i);

    userEvent.click(breakfastBtn);

    const name1 = await screen.findByText(/breakfast potatoes/i);

    expect(name1).toBeInTheDocument();

     userEvent.click(goatBtn);

    const name2 = await screen.findByText(/mbuzi choma/i);

    expect(name2).toBeInTheDocument();

    userEvent.click(allBtn);

    const name3 = await screen.findByText(/corba/i);

    expect(name3).toBeInTheDocument();
  })
});

describe('testes do componente recipes da pagina /drinks', () => {
  it('testa se os botões de filtro são renderizados', async () => {
    const {history} = renderWithRouter(<App />)

    history.push('/drinks');

    const cocoaBtn = await screen.findByTestId(/cocoa-category-filter/i);
    const allBtn = await screen.findByTestId(/all-category-filter/i);

    expect(cocoaBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  })

  it('testa se os filtros estão funcionando', async () => {
    const {history} = renderWithRouter(<App />)

    history.push('/drinks');

    const allBtn = await screen.findByTestId(/all-category-filter/i);
    const cocoaBtn = await screen.findByTestId(/cocoa-category-filter/i);

     userEvent.click(cocoaBtn);

    const name1 = await screen.findByText(/castillian hot chocolate/i);

    expect(name1).toBeInTheDocument();

    userEvent.click(allBtn);

    const name2 = await screen.findByText(/gg/i);

    expect(name2).toBeInTheDocument();
  })
});
