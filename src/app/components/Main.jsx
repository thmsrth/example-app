import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MAIN_PATH } from '../../../config/constants';

import Register from '../../global/discovery/components/Register';
import Deregister from '../../global/discovery/components/Deregister';
import NotFound from '../../global/security/components/NotFound';
import NoAccess from '../../global/security/components/NoAccess';
import NotLoggedIn from '../../global/security/components/NotLoggedIn';
import PrivateRoute from '../../global/security/components/PrivateRoute';
import LoginPage from '../../global/security/components/LoginPage';

import MasterPage from './master/MasterPage';
import DetailPage from './detail/DetailPage';
import CreateExamplePage from './form/CreateExamplePage';
import EditExamplePage from './form/EditExamplePage';

import './Main.css';

const Main = props => (
  <div className="Main">
    <div className="Main__container">
      <Switch>
        <Route exact path={`${MAIN_PATH}/login`} component={LoginPage} />
        <Route exact path={`${MAIN_PATH}/error401`} component={NotLoggedIn} />
        <Route exact path={`${MAIN_PATH}/error403`} component={NoAccess} />

        <PrivateRoute
          {...props}
          exact
          path={`${MAIN_PATH}/create`}
          component={CreateExamplePage}
          permission="EXAMPLE_CREATE"
        />

        <PrivateRoute
          {...props}
          exact
          path={`${MAIN_PATH}/:id(\\d+)/edit`}
          component={EditExamplePage}
          permission="EXAMPLE_EDIT"
        />

        <PrivateRoute
          {...props}
          exact
          path={`${MAIN_PATH}/:id(\\d+)`}
          component={DetailPage}
          permission="EXAMPLE_DETAIL"
        />

        <PrivateRoute
          {...props}
          exact
          path={MAIN_PATH}
          component={MasterPage}
          permission="EXAMPLE_LIST"
        />

        <Route exact path="/register" component={Register} />
        <Route exact path="/deregister" component={Deregister} />

        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default Main;
