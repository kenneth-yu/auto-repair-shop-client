import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { List } from 'semantic-ui-react'

class CarCard extends React.Component{
  render(){
    return(
        <List.Item>
        <Link to={`/cars/${this.props.carDetails.id}`} className="link">
          {this.props.carDetails.year + " " + this.props.carDetails.make + " " + this.props.carDetails.model}
          </Link>
        </List.Item>
    )
  }
}

const mapDispatchToProps = () => {
  return{

  }
}
export default connect(null, mapDispatchToProps)(CarCard)
