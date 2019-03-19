import React from 'react'
import {connect} from 'react-redux'
import {addNewJob} from '../Redux/actions'
import SidebarContainer from '../containers/SidebarContainer'
import { Redirect } from 'react-router-dom'
import Select from "react-dropdown-select";
import {getCars, getCustomers} from '../Redux/actions'

class NewJob extends React.Component{
  componentDidMount(){
    this.props.getCars()
    this.props.getCustomers()
  }

  state = {
    quote: -1,
    job_name: "",
    notes: "",
    relevantCars: [],
    selectedCustomer:{},
    selectedCar:{}
  }

  customerValues = (values) => {
    console.log(values)
    if (this.props.allCars.length > 0  && this.props.allCustomers.length > 0 && values.length > 0){
      let relevantCars = this.props.allCars.filter(oneCar => oneCar.customer_id === values[0].id)
      this.setState({
        relevantCars: relevantCars,
        selectedCustomer: values[0]
      })
    }
  }

  setValues = (values) => {
    console.log(values)
    if (this.props.allCars.length > 0  && this.props.allCustomers.length > 0){
      this.setState({
        selectedCar: values[0]
      })
    }
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
    // console.log(this.props)
    return(
      <div>
        <SidebarContainer/>
        <div className="drop-down">
          <Select labelField="name" options={this.props.allCustomers} onChange={(values) => this.customerValues(values)} />
          <Select labelField="model" options={this.state.relevantCars} onChange={(values) => this.setValues(values)} />
        </div>
        Job Name: <input type="text" name="job_name" value={this.state.name} onChange={this.changeHandler}/><br/>
        Quote: <input type="text" name="quote" value={this.state.quote=== -1 ? "" : this.state.quote} onChange={this.changeHandler}/><br/>
        Notes: <input type="text" name="notes" value={this.state.notes} onChange={this.changeHandler}/><br/>
        <input type="button" name="submit" value="Add New Job" onClick={() => this.props.addNewJob(this.props.currentUser, this.state.selectedCar, this.state.quote, this.state.job_name, this.state.notes)}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addNewJob: (currentUser, selectedCar, quote, job_name, notes) => dispatch(addNewJob(currentUser, selectedCar, quote, job_name, notes)),
    getCustomers: () => dispatch(getCustomers()),
    getCars: () => dispatch(getCars())
  }
}

const mapStateToProps = (state) =>{
  return{
    allCustomers: state.reducer.allCustomers,
    allCars: state.reducer.allCars,
    currentUser: state.reducer.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewJob)
