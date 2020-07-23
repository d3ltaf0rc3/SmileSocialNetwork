import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ErrorPage from './pages/error-page';
import ProfilePage from './pages/profile-page';
import SettingsPage from './pages/settings-page';
import AddPostPage from './pages/add-post-page';
import PostPage from './pages/post-page';
import ChangePasswordPage from './pages/change-password-page';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/user/:username" component={ProfilePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/add-post" component={AddPostPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/change-password" component={ChangePasswordPage} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
