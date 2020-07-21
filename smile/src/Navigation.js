import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ErrorPage from './pages/error-page';
import ProfilePage from './pages/profile-page';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage}/>
        <Route path="/user/:username" component={ProfilePage} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
