import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { List, Divider} from 'semantic-ui-react'


class CarCard extends React.Component{


  render(){
    // console.log(this.props.allCustomers)
    return(
        <List.Item>
        <Link to={`/cars/${this.props.carDetails.id}`} className="link">
          {this.props.carDetails.year + " " + this.props.carDetails.make + " " + this.props.carDetails.model}
          </Link>
          <div className="divider">
          <Divider clearing></Divider>
          </div>
        </List.Item>
    )
  }
}


export default connect()(CarCard)
