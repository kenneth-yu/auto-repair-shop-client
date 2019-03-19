import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class JobCard extends React.Component{
  render(){
    return(
        <li>
          <Link to={`/jobs/${this.props.jobDetails.id}`}>{this.props.jobDetails.job_name}</Link>
        </li>
    )
  }
}

const mapDispatchToProps = () => {
  return{

  }
}

const mapStateToProps = (state) => {
  return{
    allCars: state.reducer.allCars,
    allCustomers: state.reducer.allCustomers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCard)
