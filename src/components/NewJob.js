import React from 'react'
import {connect} from 'react-redux'
import {addNewJob} from '../Redux/actions'
import SidebarContainer from '../containers/SidebarContainer'
import { Redirect } from 'react-router-dom'
import { Button, Form} from 'semantic-ui-react'
// import Select from "react-dropdown-select";
import Select from 'react-select'
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
    selectedCar:{},
    redirect: false
  }

  customerValues = (values) => {
    console.log(values.value)
    if (this.props.allCars.length > 0  && this.props.allCustomers.length > 0){
      let relevantCars = this.props.allCars.filter(oneCar => oneCar.customer_id === values.value)
      let relevantCarOptions = relevantCars.map(oneCar => {
        return {value: oneCar.id, label: oneCar.year + " " + oneCar.make + " " + oneCar.model}
      })
      this.setState({
        relevantCars: relevantCarOptions,
        selectedCustomer: values.value
      })
    }
  }

  setValues = (values) => {
    // console.log(values)
    if (this.props.allCars.length > 0  && this.props.allCustomers.length > 0){
      this.setState({
        selectedCar: values.value
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
    let options = this.props.allCustomers.map(oneCustomer => {
      return {value: oneCustomer.id, label: oneCustomer.name}
    })
    // console.log(this.props.allCustomers)
    return(
      <div>
        <SidebarContainer/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="jobs-form">
          <h1>New Job Form</h1>
          <div className="drop-down">
            <Select placeholder="Select a Customer..." options={options} onChange={(values) => this.customerValues(values)} />
            <Select placeholder="Select a Car..." options={this.state.relevantCars} onChange={(values) => this.setValues(values)} />
          </div>
          <Form.Input placeholder="Job Name..." type="text" name="job_name" value={this.state.name} onChange={this.changeHandler}/><br/>
          <Form.Input placeholder="Quote..." type="text" name="quote" value={this.state.quote=== -1 ? "" : this.state.quote} onChange={this.changeHandler}/><br/>
          <Form.Input placeholder="Notes..." type="text" name="notes" value={this.state.notes} onChange={this.changeHandler}/><br/>
          <Button type="button" name="submit" value="Add New Job"
          onClick={() => {
            this.props.addNewJob(this.props.currentUser, this.state.selectedCar, this.state.quote, this.state.job_name, this.state.notes)
          }}>
          Add New Job
          </Button>
        </div>
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
