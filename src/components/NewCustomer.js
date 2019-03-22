import React from 'react'
import {connect} from 'react-redux'
import {addNewCustomer} from '../Redux/actions'
import SidebarContainer from '../containers/SidebarContainer'
import { Redirect } from 'react-router-dom'
import { Input, Button, Form } from 'semantic-ui-react'

class NewCustomer extends React.Component{
  state = {
    name: "",
    address: "",
    dob: ""
  }

  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to="/login"/>
    }
    return(
      <div>
        <SidebarContainer/>
        <span className="text">Name: </span> <Form.Input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/><br/>
        <span className="text">Address: </span><Form.Input type="text" name="address" value={this.state.address} onChange={this.changeHandler}/><br/>
        <span className="text">DOB:</span> <Form.Input type="text" name="dob" value={this.state.dob} onChange={this.changeHandler}/><br/>
        <Button type="button" name="submit" value="Create Customer Profile"
        onClick={() => this.props.addNewCustomer(this.state.name, this.state.address, this.state.dob)}>
        Create Customer Profile
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addNewCustomer: (name, address, dob) => dispatch(addNewCustomer(name, address, dob))
  }
}

export default connect(null, mapDispatchToProps)(NewCustomer)
