import React from 'react'
import {connect} from 'react-redux'
import {getCars, getCustomers, toggleJobStatus} from '../Redux/actions'
import moment from 'moment'
import {Button, Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class QueueCard extends React.Component{
  state ={
    redirect: false
  }
  componentDidMount(){
    // console.log("componentDidMount")
    this.props.getCars()
    this.props.getCustomers()
  }

  clickHandler = (event) => {
    // debugger
    // console.log(event.target)
    if (event.target.classList.value === "queue-card" ||
      event.target.classList.value  === "car-job-header" ||
      event.target.classList.value  ==="car-job"){
        this.setState({
            redirect: !this.state.redirect
          })
      }
  }


  render(){
    // console.log("render")
    const {jobDetails, allCars, allCustomers} = this.props
    // console.log(allCustomers)
    // console.log(jobDetails)
    if (allCars.length !== 0  && allCustomers.length !== 0){
      let relevantCar = allCars.find(oneCar => oneCar.id === jobDetails.car_id)
      let relevantCustomer = allCustomers.find(oneCustomer => oneCustomer.id === relevantCar.customer_id)
      return(
        <Grid.Column width={6}>
        {this.state.redirect ? <Redirect to={"/jobs/" + jobDetails.id}/> : null}
        <div className="queue-card" onClick={(event) => this.clickHandler(event)} >
          <h1 className="car-job-header">{!!relevantCar ? relevantCar.year+ " "+ relevantCar.make+ " " + relevantCar.model : null}</h1>
          <h1 className="car-job">{!!relevantCar ? jobDetails.job_name : null}</h1>
          <h2 className="job-desc">Time In: {!!relevantCar ? moment(jobDetails.created_at).format('lll') : null} </h2>
          <h2 className="job-desc" style={jobDetails.status ? {color:"green"}:{color:"yellow"}}> Status: {!!relevantCar ? (jobDetails.status ? "Completed":"In Progress") : null}</h2>
          <h2 className="job-desc">Owner: {!!relevantCustomer ? relevantCustomer.name :null}</h2>
          <Button className="dash-button" onClick={() => this.props.toggleJobStatus(jobDetails)}
          type="button" name="finished" value="Mark Job as Completed">
          {jobDetails.status ? "Mark Job as In Progress" : "Mark Job as Completed"}
          </Button>
        </div>
        </Grid.Column>
      )
    }
    else{
      return null
    }
  }

}

const mapStateToProps = (state) =>{
  // console.log("map")
  return{
    allCars: state.reducer.allCars,
    allCustomers: state.reducer.allCustomers
  }
}

const mapDispatchToProps = (dispatch) =>{
  // console.log("dispatch")
  return{
    getCars: () => dispatch(getCars()),
    getCustomers: () => dispatch(getCustomers()),
    toggleJobStatus: (jobDetails) => dispatch(toggleJobStatus(jobDetails))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueCard)
