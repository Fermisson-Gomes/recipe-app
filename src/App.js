import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from './context/Context';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Receitas from './pages/Receitas';
import FoodsId from './pages/FoodsId';
import Drinks from './pages/Drinks';
import DrinksId from './pages/DrinksId';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/recipes" component={ Receitas } />
        <Route exact path="/foods" component={ Foods } />
        <Route path="/foods:id" component={ FoodsId } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/drinks:id" component={ DrinksId } />
        <Route path="/foods/:id/in-progress" component={ FoodsInProgress } />
        <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
