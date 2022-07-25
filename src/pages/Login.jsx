import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Context';
// import pizzaIcon from '../images/pizza.png';

const Login = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { handleChange, loginState } = useContext(Context);

  useEffect(() => {
    const regexValidation = /\S+@\w+\.\w+/i;
    const emailValidation = regexValidation.test(loginState.email);
    const n6 = 6;
    const passwordValidation = (loginState.password.length > n6);
    if (emailValidation && passwordValidation) setIsDisabled(false);
    else setIsDisabled(true);
  }, [loginState]);

  const submitClick = (event) => {
    event.preventDefault();
    const { history } = props;
    const obj = { email: loginState.email };
    localStorage.setItem('user', JSON.stringify(obj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <>
      {/* <img src={ pizzaIcon } alt="pizza" className="pizza-icon" /> */}
      <div className="login-inputs">
        <input
          type="email"
          name="email"
          onChange={ handleChange }
          value={ loginState.email }
          placeholder="Insira Seu E-mail"
          data-testid="email-input"
          className="input-login-page"
        />
        <input
          type="password"
          name="password"
          onChange={ handleChange }
          value={ loginState.password }
          placeholder="Insira Sua Senha"
          data-testid="password-input"
          className="input-login-page"
        />
        <button
          type="submit"
          onClick={ submitClick }
          disabled={ isDisabled }
          data-testid="login-submit-btn"
          className="btn-login-page"
        >
          entrar
        </button>
      </div>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
