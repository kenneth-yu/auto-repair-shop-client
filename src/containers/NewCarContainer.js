import React from 'react'
import VinChecker from '../components/VinChecker'
import SidebarContainer from './SidebarContainer'
import { Redirect } from 'react-router-dom'
// import Select from "react-dropdown-select";
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
    this.setState({selectedCustomer: values.value})
  }

  render(){
    if (!localStorage.getItem('token')){
      return <Redirect to="/login"/>
    }
    let options = this.props.allCustomers.map(oneCustomer => {
      return {value: oneCustomer.id, label: oneCustomer.name}
    })
    console.log(this.state.selectedCustomer)
    return(
      <div>
        <SidebarContainer/>
        <br/><br/><br/><br/><br/><br/><br/>
        <VinChecker options={options} selectedCustomer={this.state.selectedCustomer}/>
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
