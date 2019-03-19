import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CustomerCard extends React.Component{




  render(){
    return(<li>
      <Link to={`/customers/${this.props.customerDetails.id}`}>{this.props.customerDetails.name}</Link>
      </li>)
  }
}


export default connect()(CustomerCard)
