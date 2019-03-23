import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCars, getCustomers} from '../Redux/actions'
import { List, Divider } from 'semantic-ui-react'
import moment from 'moment'

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
      <div>
        <List.Item>
          <Link to={`/jobs/${this.props.jobDetails.id}`} className="link">
          {this.props.jobDetails.job_name + " - " +
          relevantCar.year + " " +
          relevantCar.make + " " +
          relevantCar.model + " - " +
          moment(this.props.jobDetails.created_at).format('lll')
        }
          </Link>
        </List.Item>
        <div className="divider">
        <Divider clearing></Divider>
        </div>
      </div>
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
