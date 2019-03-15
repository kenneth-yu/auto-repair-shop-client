import React from "react";
import {connect} from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import { Redirect } from 'react-router-dom'

class SidebarContainer extends React.Component {
  showSettings (event) {
    event.preventDefault();

  }

  // newCustomerRedirect = () => {
  //
  // }

  render () {
    return (
      <Menu width={'22%'}>
        <span className="menu-item">Add New Customer</span>
        <span className="menu-item">Add New Car</span>
        <span className="menu-item">Add New Job</span>
        <span className="menu-item">Search Customers</span>
        <span className="menu-item">Search Cars</span>
        <span className="menu-item">Search Job History</span>
      </Menu>
    );
  }
}


export default connect()(SidebarContainer)
