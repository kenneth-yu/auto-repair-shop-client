import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CarCard extends React.Component{
  render(){
    return(
        <li>
        <Link to={`/cars/${this.props.carDetails.id}`}>
          {this.props.carDetails.year + " " + this.props.carDetails.make + " " + this.props.carDetails.model}
          </Link>
        </li>
    )
  }
}

const mapDispatchToProps = () => {
  return{

  }
}
export default connect(null, mapDispatchToProps)(CarCard)
