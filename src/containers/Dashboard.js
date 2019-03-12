import React from 'react'
import {connect} from 'react-redux'
import SidebarContainer from './SidebarContainer'
import VinChecker from '../components/VinChecker'

class Dashboard extends React.Component{
  render(){
    return(
      <div>
        <SidebarContainer/>
        <h1>Current Queue</h1>
        <h2>Car: 2001 Honda Prelude</h2>
        <h2>Job: Oil Change</h2>
        <h2>Owner: Kenny</h2>
        <h2>Time-In: 11:43 AM</h2>
        <h2>Status: In Progress</h2>
        <input type="button" name="finished" value="Mark Job as Completed"/>
      </div>
    )
  }
}

export default Dashboard
