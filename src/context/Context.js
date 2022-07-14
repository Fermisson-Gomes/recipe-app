import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLoginState((old) => ({ ...old, [name]: value }));
  };

  const contextValue = {
    loginState,
    handleChange,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export { Provider };
