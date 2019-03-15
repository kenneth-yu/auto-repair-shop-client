import React, { Component } from 'react';
import VinChecker from './components/VinChecker'
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import NewCustomer from './components/NewCustomer'
import NewJob from './components/NewJob'
import NewCarContainer from './containers/NewCarContainer'
// import Forbidden from './componenets/Forbidden'
import { Route, Switch } from "react-router-dom";
import './App.css';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';

// import url from './App'

class App extends Component {



  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/newcustomer" component={NewCustomer}/>
          <Route path="/newcar" component={NewCarContainer}/>
          <Route path="/newjob" component={NewJob}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(withRouter(App));
