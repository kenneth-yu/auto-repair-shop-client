import React from "react";
import {connect} from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import { Redirect, withRouter} from 'react-router-dom'

class SidebarContainer extends React.Component {
  componentDidMount(){
    this.props.resetRedirectState()
  }

  render () {
    console.log(this.props.location.pathname)
    let {dashboard, newCustomer, newCar, newJob, searchCustomer, searchCar, searchJob} = this.props
    if (dashboard){
      // console.log('hi')
      if(this.props.location.pathname !== "/dashboard"){
        return <Redirect to="/dashboard"/>
        }
      }
    else if (newCustomer){
      // console.log('hi')
      if(this.props.location.pathname !== "/newcustomer"){
        return <Redirect to="/newcustomer"/>
      }
    }
    else if (newCar){
      if(this.props.location.pathname !== "/newcar"){
        return <Redirect to="/newcar"/>
      }
    }
    else if (newJob){
      if(this.props.location.pathname !== "/newjob"){
        return <Redirect to="/newjob"/>
      }
    }
    else if (searchCustomer){
      if(this.props.location.pathname !== "/customers"){
        return <Redirect to="/customers"/>
      }
    }
    else if (searchCar){
      if(this.props.location.pathname !== "/cars"){
        return <Redirect to="/cars"/>
      }
    }
    else if (searchJob){
      if(this.props.location.pathname !== "/jobs"){
        return <Redirect to="/jobs"/>
      }
    }


    return (
      <Menu width={'15%'}>
        <span className="menu-item" id="dashboard"  onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Dashboard</span>
        <span className="menu-item" id="newCustomer" onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Add New Customer</span>
        <span className="menu-item" id="newCar" onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Add New Car</span>
        <span className="menu-item" id="newJob" onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Add New Job</span>
        <span className="menu-item" id="searchCustomer" onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Search Customers</span>
        <span className="menu-item" id="searchCar" onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Search Cars</span>
        <span className="menu-item" id="searchJob" onClick={(event) => this.props.setRedirectState(event.target.id, this.props.location.pathname)}>Search Job History</span>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    dashboard: state.reducer.dashboard,
    newCustomer: state.reducer.newCustomer,
    newCar: state.reducer.newCar,
    newJob: state.reducer.newJob,
    searchCustomer: state.reducer.searchCustomer,
    searchCar: state.reducer.searchCar,
    searchJob: state.reducer.searchJob
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    // authenticateUser: (username, password) => dispatch(authenticateUser(username, password))
    setRedirectState: (clickedSpan, url) => dispatch({type: "SET_REDIRECT_STATE", payload: {clickedSpan: clickedSpan,url: url}}),
    resetRedirectState: (clickedSpan) => dispatch({type: "RESET_REDIRECT_STATE", payload: clickedSpan})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarContainer))
