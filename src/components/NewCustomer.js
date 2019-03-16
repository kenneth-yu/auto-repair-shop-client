import React from 'react'
import {connect} from 'react-redux'
import {addNewCustomer} from '../Redux/actions'
import SidebarContainer from '../containers/SidebarContainer'
import { Redirect } from 'react-router-dom'

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
        Name: <input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/><br/>
        Address: <input type="text" name="address" value={this.state.address} onChange={this.changeHandler}/><br/>
        DOB: <input type="text" name="dob" value={this.state.dob} onChange={this.changeHandler}/><br/>
        <input type="button" name="submit" value="Create Customer Profile" onClick={() => this.props.addNewCustomer(this.state.name, this.state.address, this.state.dob)}/>
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
