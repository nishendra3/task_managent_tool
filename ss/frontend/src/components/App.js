import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import Sourcing from './parts/Sourcing';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

import AddTimelines from './parts/AddTimelines'
import AddDetails from './parts/AddDetails'
import UnderConst from './parts/UnderConst'
import GanttChart from './parts/GanttChart'
import GetReport  from './parts/GetReport';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="p-5 bg-light bg-gradient">
                <Switch>
                  {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
                  <PrivateRoute exact path="/" component={Sourcing} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/addtimelines" component={AddTimelines} />
                  <PrivateRoute exact path="/adddetails" component={AddDetails} />
                  <PrivateRoute exact path="/uc" component={UnderConst} />
                  <PrivateRoute exact path="/gantt" component={GanttChart} />
                  <PrivateRoute exact path="/reports" component={GetReport} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));