import React from 'react'
import {connect} from 'react-redux'
import {getCars, getCustomers} from '../Redux/actions'

class QueueCard extends React.Component{
  componentDidMount(){
    // console.log("componentDidMount")
    this.props.getCars()
    this.props.getCustomers()
  }


  render(){
    // console.log("render")
    const {jobDetails, allCars, allCustomers} = this.props
    // console.log(allCustomers)
    // console.log(jobDetails)
    if (allCars.length !== 0  && allCustomers.length !== 0){
      let relevantCar = allCars.find(oneCar => oneCar.id === jobDetails.car_id)
      let relevantCustomer = allCustomers.find(oneCustomer => oneCustomer.id === relevantCar.customer_id)
      // console.log(relevantCustomer)
      // console.log(!!relevantCar)
      // console.log(!!relevantCustomer)
      return(
        <div className="queue-card">
        <h1 className="car-job-header">{!!relevantCar ? relevantCar.year+ " "+ relevantCar.make+ " " + relevantCar.model + " - " + jobDetails.job_name: null}</h1>
        <h2>Time-In: 11:43 AM - Status: In Progress</h2>
        <h2>Owner: {!!relevantCustomer ? relevantCustomer.name :null}</h2>
        <input type="button" name="finished" value="Mark Job as Completed"/>
        </div>
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
    getCustomers: () => dispatch(getCustomers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueCard)
