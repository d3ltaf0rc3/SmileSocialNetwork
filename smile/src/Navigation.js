import { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ErrorPage from './pages/error-page';
import ProfilePage from './pages/profile-page';
import SettingsPage from './pages/settings-page';
import AddPostPage from './pages/add-post-page';
import ChangePasswordPage from './pages/change-password-page';
import AuthContext from './contexts/AuthContext';

const Navigation = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => loggedIn ? <HomePage /> : <Redirect to="/login" />} />
        <Route path="/login" exact render={() => !loggedIn ? <LoginPage /> : <Redirect to="/" />} />
        <Route path="/register" exact render={() => !loggedIn ? <RegisterPage /> : <Redirect to="/" />} />
        <Route path="/user/:username" exact render={() => loggedIn ? <ProfilePage /> : <Redirect to="/login" />} />
        <Route path="/account/settings" exact render={() => loggedIn ? <SettingsPage /> : <Redirect to="/login" />} />
        <Route path="/post/add" exact render={() => loggedIn ? <AddPostPage /> : <Redirect to="/login" />} />
        <Route path="/change-password" exact render={() => loggedIn ? <ChangePasswordPage /> : <Redirect to="/login" />} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
