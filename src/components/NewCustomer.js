import React from 'react'
import {connect} from 'react-redux'
import {addNewCustomer} from '../Redux/actions'
import SidebarContainer from '../containers/SidebarContainer'
import { Redirect } from 'react-router-dom'
import {Button, Form } from 'semantic-ui-react'

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
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="customer-form">
          <h1>New Customer Form</h1>
          <Form.Input placeholder="Name..." type="text" name="name" value={this.state.name} onChange={this.changeHandler}/><br/>
          <Form.Input placeholder="Address..." type="text" name="address" value={this.state.address} onChange={this.changeHandler}/><br/>
          <Form.Input placeholder="Date of Birth..." type="text" name="dob" value={this.state.dob} onChange={this.changeHandler}/><br/>
          <Button className="selectedsort" type="button" name="submit" value="Create Customer Profile"
          onClick={() => this.props.addNewCustomer(this.state.name, this.state.address, this.state.dob)}>
          Submit
          </Button>
        </div>
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
