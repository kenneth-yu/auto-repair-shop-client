import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Input, Button, List } from 'semantic-ui-react'

class CustomerCard extends React.Component{

  render(){
    return(<List.Item>
      <Link to={`/customers/${this.props.customerDetails.id}`} className="link">{this.props.customerDetails.name}</Link>
      </List.Item>)
  }
}


export default connect()(CustomerCard)
