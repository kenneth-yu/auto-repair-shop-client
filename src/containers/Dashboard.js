import React from 'react'
import {connect} from 'react-redux'
import SidebarContainer from './SidebarContainer'
import VinChecker from '../components/VinChecker'
import QueueContainer from '../containers/QueueContainer'
import SortButtons from '../components/SortButtons'
import { Redirect } from 'react-router-dom'

class Dashboard extends React.Component{

  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to="/login"/>
    }
    return(
      <div>
        <SidebarContainer/>
        <h1>Current Queue</h1>
        <SortButtons/><br/>
        <QueueContainer/>
      </div>
    )
  }
}

export default connect()(Dashboard)
