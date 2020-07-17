import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/home-page';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
