import React, { Component } from 'react';
import VinChecker from './components/VinChecker'
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import { Route, Switch } from "react-router-dom";
import './App.css';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import url from './App'

class App extends Component {
  state = {
    authenticated: false
  }

  authenticateUser = (username, password) =>{
    let user = {username: username, password: password}
    fetch(`http://localhost:3000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({user})
    }).then(res => res.json())
    .then(data =>{
      this.props.history.push("/dashboard");
      this.setState({
        authenticated: true
      })
    }).catch(window.alert("Login Unsuccessful. Please Try Again!"))
  }

  createNewAccount = (username, password, passwordConfirm) =>{
    let user = {username: username, password: password}
    if (username !== "" && password !== "" && passwordConfirm !== ""){
        if(password === passwordConfirm){
          fetch(`http://localhost:3000/api/v1/users`, {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({user})
          }).then(res => res.json())
          .then(data => console.log(data))
        }
        else{
          window.alert("Password and Confirm Password Fields do not match!")
        }
    }
    else{
      window.alert("Please Fill In Username, Password, and Confirm Password Fields!")
    }
  }

  render() {
    return (
      <div className="App">

      <Switch>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/" render={(props) => <Login createUser={this.createNewAccount} authenticate={this.authenticateUser} />}/>
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
