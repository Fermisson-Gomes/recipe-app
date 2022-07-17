import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const [optionValue, setOptionValue] = useState('');

  const [response, setResponse] = useState([]);

  const [search, setSearch] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setLoginState((old) => ({ ...old, [name]: value }));
  };

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const contextValue = {
    loginState,
    handleChange,
    search,
    handleSearchChange,
    setOptionValue,
    optionValue,
    response,
    setResponse,
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
