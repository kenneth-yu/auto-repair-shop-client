import React from 'react'
import VinChecker from '../components/VinChecker'
import SidebarContainer from './SidebarContainer'
import { Redirect } from 'react-router-dom'
import Select from "react-dropdown-select";
import {connect} from 'react-redux'
import {getCustomers} from '../Redux/actions'


class NewCarContainer extends React.Component{
  componentDidMount(){
    this.props.getCustomers()
  }

  state = {
    selectedCustomer: {}
  }

  setValues = (values) => {
    if (values.length > 0){
      this.setState({selectedCustomer: values[0]})
    }
  }

  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to="/login"/>
    }
    // console.log(this.props)
    return(
      <div>
      <SidebarContainer/>
        <div className="drop-down">
          <Select labelField="name" options={this.props.allCustomers} onChange={(values) => this.setValues(values)} />
        </div>
        <VinChecker selectedCustomer={this.state.selectedCustomer}/>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    allCustomers: state.reducer.allCustomers
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getCustomers: () => dispatch(getCustomers())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewCarContainer)
