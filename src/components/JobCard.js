import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCars, getCustomers} from '../Redux/actions'

class JobCard extends React.Component{

  componentDidMount(){
    // console.log("componentDidMount")
    this.props.getCars()
    this.props.getCustomers()
  }

  render(){
    const {jobDetails, allCars, allCustomers} = this.props
    if (allCars.length !== 0  && allCustomers.length !== 0){
      let relevantCar = allCars.find(oneCar => oneCar.id === jobDetails.car_id)
      // let relevantCustomer = allCustomers.find(oneCustomer => oneCustomer.id === relevantCar.customer_id)
    return(
        <li>
          <Link to={`/jobs/${this.props.jobDetails.id}`}>
          {this.props.jobDetails.job_name + " - " + relevantCar.year + " " + relevantCar.make + " " + relevantCar.model}
          </Link>
        </li>
    )
  }
    else{
      return null
    }
  }
}

const mapDispatchToProps = (dispatch) =>{
  // console.log("dispatch")
  return{
    getCars: () => dispatch(getCars()),
    getCustomers: () => dispatch(getCustomers())
  }
}

const mapStateToProps = (state) => {
  return{
    allCars: state.reducer.allCars,
    allCustomers: state.reducer.allCustomers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCard)
