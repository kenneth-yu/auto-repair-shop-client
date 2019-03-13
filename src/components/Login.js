import React from 'react'
import {connect} from 'react-redux'

class Login extends React.Component{
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    newAccount: false
  }

  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clickHandler = () => {
    this.setState({
      newAccount: !this.state.newAccount
    })
  }

  render(){
    return(
      <div>
        Username: <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}/><br/>
        Password: <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}/><br/>
        {this.state.newAccount ? "Confirm Password: " : null}
        {this.state.newAccount ?
        <input type="text" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.changeHandler}/>
        : null} <br/>
        {this.state.newAccount ?
          <input type="button" name="submit" value="Create Account" onClick={() => this.props.createUser(this.state.username, this.state.password, this.state.passwordConfirm)}/>
        : <input type="button" name="submit" value="LOGIN" onClick={() => this.props.authenticate(this.state.username, this.state.password)}/>}
        <br/><span className="pseudolink" onClick={this.clickHandler}>Create a New Account</span>
      </div>
    )
  }
}

export default Login
