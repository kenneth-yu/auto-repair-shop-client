import React from 'react'
import {connect} from 'react-redux'
import {addNewJob} from '../Redux/actions'
import SidebarContainer from '../containers/SidebarContainer'
import { Redirect } from 'react-router-dom'

class NewJob extends React.Component{
  state = {
    quote: -1,
    job_name: "",
    notes: ""

  }

  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    //MISSING TWO DROP DOWN MENUS. ONE FOR CORRESPONDING CUSTOMER AND ONE FOR THEIR CARS.
    if (!localStorage.getItem('token')){
      return <Redirect to="/login"/>
    }
    return(
      <div>
        <SidebarContainer/>
        Job Name: <input type="text" name="job_name" value={this.state.name} onChange={this.changeHandler}/><br/>
        Quote: <input type="text" name="quote" value={this.state.quote=== -1 ? "" : this.state.quote} onChange={this.changeHandler}/><br/>
        Notes: <input type="text" name="notes" value={this.state.notes} onChange={this.changeHandler}/><br/>
        <input type="button" name="submit" value="Add New Job" onClick={() => this.props.addNewCustomer(this.state.name, this.state.address, this.state.dob)}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addNewCustomer: (quote, job_name, notes) => dispatch(addNewJob(quote, job_name, notes))
  }
}

export default connect(null, mapDispatchToProps)(NewJob)
