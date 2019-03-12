import React, { Component } from 'react';
import VinChecker from './components/VinChecker'
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import { Route, Switch } from "react-router-dom";
import './App.css';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';

class App extends Component {
  state = {
    authenticated: false
  }

  authenticateUser = () =>{
    this.setState({
      authenticated: true
    })
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div className="App">

      <Switch>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/" render={(props) => <Login authenticate={this.authenticateUser} />}/>
      </Switch>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    badVin: state.badVin,
    manualInsert: state.manualInsert,
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return{
//     vinTextChange:(text) => dispatch(vinTextChanger)
//   }
// }
export default connect(mapStateToProps)(withRouter(App));
