import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/home';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
