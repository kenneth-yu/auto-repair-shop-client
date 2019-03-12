import React from 'react'
import {connect} from 'react-redux'

class Login extends React.Component{
  state = {
    username: "",
    password: "",
  }

  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <div>
        Username: <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}/><br/>
        Password: <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}/><br/>
        <input type="button" name="submit" value="LOGIN" onClick={this.props.authenticate}/>
      </div>
    )
  }
}

export default Login
