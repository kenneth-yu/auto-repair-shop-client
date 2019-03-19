import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'

class ShowCustomer extends React.Component{
  render(){
    return(
      <div>
        <SidebarContainer/>
        Year: <h2>{this.props.car.year}</h2><br/>
        Make: <h2>{this.props.car.make}</h2><br/>
        Model: <h2>{this.props.car.model}</h2><br/>
      </div>
    )
  }
}

export default ShowCustomer
