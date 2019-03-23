import React from 'react'
import {connect} from 'react-redux'
import {authenticateUser, createUser} from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import {Form, Button, Input} from 'semantic-ui-react'

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
    if (localStorage.token){
      return <Redirect to="/dashboard"/>
    }

    return(
      <Form className="login">
        <Form.Field>
          <label style={{color: "white"}}>Username</label>
          <Input placeholder="Username..." type="text" name="username" value={this.state.username} onChange={this.changeHandler}/>
        </Form.Field>
        <Form.Field>
          <label style={{color: "white"}}>Password</label>
          <Input placeholder="Password..." type="text" name="password" value={this.state.password} onChange={this.changeHandler}/><br/>
        </Form.Field>
        <Form.Field>
          {this.state.newAccount ? <label style={{color: "white"}}>Confirm Password</label> : null}
          {this.state.newAccount ?
          <Input placeholder="Password Confirmation..." type="text" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.changeHandler}/>
          : null}
        </Form.Field>
          {this.state.newAccount ?
            <Button type="button" name="submit" value="Create Account"
            onClick={() => this.props.createUser(this.state.username, this.state.password, this.state.passwordConfirm)}>
            Create Account
            </Button>
          : <Button type="button" name="submit" value="LOGIN"
          onClick={() => this.props.authenticateUser(this.state.username, this.state.password)}>
          Login
        </Button>}
        <Form.Field>
        <br/>
        <span style={{color:"#3395FF"}}className="pseudolink" onClick={this.clickHandler}>Create a New Account</span>
        </Form.Field>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (username, password) => dispatch(authenticateUser(username, password)),
    createUser: (username, password, passwordConfirm) => dispatch(createUser(username, password, passwordConfirm))
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reducer.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
