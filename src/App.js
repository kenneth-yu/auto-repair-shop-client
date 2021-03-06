import React, { Component } from 'react';
// import VinChecker from './components/VinChecker'
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import NewCustomer from './components/NewCustomer'
import NewJob from './components/NewJob'
import NewCarContainer from './containers/NewCarContainer'
import Customers from './containers/Customers'
import Cars from './containers/Cars'
import Jobs from './containers/Jobs'
import {getUserWithToken} from './Redux/actions'
// import SidebarContainer from './containers/SidebarContainer'
// import Forbidden from './componenets/Forbidden'
import { Route, Switch } from "react-router-dom";
import './App.css';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';

// import url from './App'

class App extends Component {
componentDidMount(){
  this.props.getUserWithToken()
}


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/newcustomer" component={NewCustomer}/>
          <Route path="/newcar" component={NewCarContainer}/>
          <Route path="/newjob" component={NewJob}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/cars" component={Cars}/>
          <Route path="/jobs" component={Jobs}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserWithToken: () => dispatch(getUserWithToken())
  }
}

export default connect(null, mapDispatchToProps)(withRouter(App));
