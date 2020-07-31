import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ErrorPage from './pages/error-page';
import ProfilePage from './pages/profile-page';
import SettingsPage from './pages/settings-page';
import AddPostPage from './pages/add-post-page';
import PostPage from './pages/post-page';
import ChangePasswordPage from './pages/change-password-page';
import AuthContext from './contexts/AuthContext';

const Navigation = () => {
  const context = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => context.loggedIn === true ? <HomePage /> : <Redirect to="/login" />} />
        <Route path="/login" render={() => context.loggedIn === false ? <LoginPage /> : <Redirect to="/" />} />
        <Route path="/register" render={() => context.loggedIn === false ? <RegisterPage /> : <Redirect to="/" />} />
        <Route path="/user/:username" render={() => context.loggedIn === true ? <ProfilePage /> : <Redirect to="/login" />} />
        <Route path="/settings" render={() => context.loggedIn === true ? <SettingsPage /> : <Redirect to="/login" />} />
        <Route path="/add-post" render={() => context.loggedIn === true ? <AddPostPage /> : <Redirect to="/login" />} />
        <Route path="/post/:id" render={() => context.loggedIn === true ? <PostPage /> : <Redirect to="/login" />} />
        <Route path="/change-password" render={() => context.loggedIn === true ? <ChangePasswordPage /> : <Redirect to="/login" />} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
