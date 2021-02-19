import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';

import Home from './home';
import About from './about';
import Contact from './contact';
import OpenSource from './opensource';
import Signup from './signup';
import Signin from './signin';
import NotFound from './notfound';

import Boards from './boards';
import Board from './boards/board';

const RouteWithSubRoutes = (route) => {
  return route.private
    ? (
      <PrivateRoute 
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

const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: Home },
  { path: '/about', key: 'ABOUT_US', component: About },
  { path: '/contact', key: 'CONTACT', component: Contact },
  { path: '/opensource', key: 'OPEN_SOURCE', component: OpenSource },
  { path: '/signin', key: 'SIGN_IN', component: Signin },
  { path: '/signup', key: 'SIGN_UP', component: Signup },
  { 
    path: '/b', 
    key: 'BOARDS', 
    private: true,
    component: RenderRoutes,
    routes: [
      {
        path: '/b',
        key: 'BOARDS_ROOT',
        exact: true,
        component: Boards
      },
      {
        path: '/b/new',
        key: 'NEW_BOARD',
        exact: true,
        component: () => <h1>New board</h1>,
      },
      {
        path: '/b/:id',
        key: 'BOARD',
        exact: true,
        component: Board
      }
    ]
  },
];

export default ROUTES;