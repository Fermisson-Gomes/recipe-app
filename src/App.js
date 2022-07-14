import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from './context/Context';
import Login from './pages/Login';
import Receitas from './pages/Receitas';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/recipes" component={ Receitas } />
      </Switch>
    </Provider>
  );
}

export default App;
