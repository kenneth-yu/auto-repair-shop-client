import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'

class ShowCustomer extends React.Component{
  render(){
    return(
      <div>
        <SidebarContainer/>
        Job: <h2>{this.props.job.job_name}</h2><br/>
        Car: <h2>{this.props.job.car_id}</h2><br/>
        Quote: <h2>{this.props.job.quote}</h2><br/>
        Status: <h2>{this.props.job.status ? "Completed":"In Progress"}</h2><br/>
        Notes: <h2>{this.props.job.notes}</h2>
      </div>
    )
  }
}

export default ShowCustomer
