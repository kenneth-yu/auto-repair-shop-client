import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'

class ShowCustomer extends React.Component{
  render(){
    return(
      <div>
        <SidebarContainer/>
        Name: <h2>{this.props.customer.name}</h2><br/>
        Address: <h2>{this.props.customer.address}</h2><br/>
        Date of Birth: <h2>{this.props.customer.dob}</h2><br/>
        Current Balance: <h2>{this.props.customer.balance}</h2>
      </div>
    )
  }
}

export default ShowCustomer
