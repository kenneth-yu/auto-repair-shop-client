import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { List, Divider} from 'semantic-ui-react'

class CustomerCard extends React.Component{

  render(){
    return(
      <div>
      <List.Item>
      <Link to={`/customers/${this.props.customerDetails.id}`} className="link">{this.props.customerDetails.name}</Link>
      </List.Item>
      <div className="divider">
      <Divider clearing></Divider>
      </div>
      </div>
    )
  }
}


export default connect()(CustomerCard)
