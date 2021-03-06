import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './home';
import About from './about';
import Contact from './contact';
import OpenSource from './opensource';
import Signup from './signup';
import Signin from './signin';
import NotFound from './notfound';

import Boards from './boards';
import Board from './boards/board';
import Favorites from './boards/favorites';

import ChangePassword from './account/change-password';
import ChangeUsername from './account/change-username';

import useUserStore from '../stores/useUserStore';

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
};

const RouteWithSubRoutes = (route) => {
  return route.protected
    ? (
      <ProtectedRoute 
        path={route.path}
        exact={route.exact}
        route={route}
      />
    )
    : (
      <Route 
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
  );
};

const ProtectedRoute = ({ path, exact, route }) => {
  const isSessionActive = useUserStore(state => state.user);
  const isAuthPage = (
    path === '/signin' || 
    path === '/signup' 
  );
  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn && isAuthPage) {
    return <Redirect to= '/' />;
  }
  else if (!isLoggedIn && isAuthPage) {
    return (
      <Route 
        path={path}
        exact={exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }

  return (
    <Route 
      path={path}
      exact={exact}
      render={props => isSessionActive ? (
        <route.component 
          {...props}
          routes={route.routes}
        />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )} 
    />
  );
};

const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: Home },
  { path: '/about', key: 'ABOUT_US', component: About },
  { path: '/contact', key: 'CONTACT', component: Contact },
  { path: '/opensource', key: 'OPEN_SOURCE', component: OpenSource },
  { path: '/signin', key: 'SIGN_IN', protected: true, component: Signin },
  { path: '/signup', key: 'SIGN_UP', protected: true, component: Signup },
  { 
    path: '/b', 
    key: 'BOARDS', 
    protected: true,
    component: RenderRoutes,
    routes: [
      {
        path: '/b',
        key: 'BOARDS_ROOT',
        exact: true,
        component: Boards
      },
      {
        path: '/b/favorites',
        key: 'FAVORITE_BOARDS',
        exact: true,
        component: Favorites,
      },
      {
        path: '/b/:id',
        key: 'BOARD',
        exact: true,
        component: Board
      }
    ]
  },
  {
    path: '/account',
    key: 'ACCOUNT',
    protected: true,
    component: RenderRoutes,
    routes: [
      {
        path: '/account/change-password',
        key: 'ACCOUNT_CHANGE_PASSWORD',
        exact: true,
        component: ChangePassword
      },
      {
        path: '/account/change-username',
        key: 'ACCOUNT_CHANGE_USERNAME',
        exact: true,
        component: ChangeUsername
      },
    ]
  }
];

export default ROUTES;
