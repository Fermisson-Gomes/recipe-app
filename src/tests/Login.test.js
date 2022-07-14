import { render, screen } from '@testing-library/react';
import App from '../App';


describe('testes da pagina de Login', () => {
  it('testa se a tela de login possui os inputs', () => {
    render(<App />)

    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  })

  it('testa se existe um botão na tela de login', () => {
    render(<App/>)

    const enterBtn = screen.getByTestId(/login-submit-btn/i);

    expect(enterBtn).toBeInTheDocument();
  })
})