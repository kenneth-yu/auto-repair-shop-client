import React from 'react'
import VinChecker from '../components/VinChecker'
import SidebarContainer from './SidebarContainer'
import { Redirect } from 'react-router-dom'


class NewCarContainer extends React.Component{
  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to="/login"/>
    }
    return(
      <div>
        <SidebarContainer/>
        <VinChecker/>
      </div>
    )
  }
}

export default NewCarContainer
