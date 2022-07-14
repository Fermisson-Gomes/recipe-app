import React from 'react';

const Login = () => (
  <div>
    <input
      type="email"
      placeholder="Insira Seu E-mail"
      data-testid="email-input"
    />
    <input
      type="password"
      placeholder="Insira Sua Senha"
      data-testid="password-input"
    />
    <button
      type="submit"
      onClick={ () => {} }
      data-testid="login-submit-btn"
    >
      entrar
    </button>
  </div>
);

export default Login;
