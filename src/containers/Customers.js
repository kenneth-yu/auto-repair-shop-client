import React from 'react'
import {connect} from 'react-redux'
import CustomerCard from '../components/CustomerCard'
import {getCustomers} from '../Redux/actions'
import SidebarContainer from './SidebarContainer'
import { Route, Switch } from "react-router-dom";
import ShowCustomer from '../components/ShowCustomer'
import { Input, List } from 'semantic-ui-react'


class Customers extends React.Component{
  state = {
    searchCustomer: ""
  }

  componentDidMount(){
    this.props.getCustomers()
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    let allCustomerList = this.props.allCustomers.filter(oneCustomer => oneCustomer.name.toLowerCase().includes(this.state.searchCustomer.toLowerCase()))
    let customerList = allCustomerList.map(oneCustomer => <CustomerCard key={oneCustomer.id} customerDetails={oneCustomer}/>)
    return(
      <Switch>
        <Route path="/customers/:id" render={
          routerProps => {
          let id = parseInt(routerProps.match.params.id)
          let customer = this.props.allCustomers.find(oneCustomer => oneCustomer.id === id)
          return (customer ? <ShowCustomer customer={customer} /> : null)
          }
        }/>
        <Route exact path="/customers" render={
          ()=>{
            return(
              <div>
              <SidebarContainer/>
              <div className="pad-header">
              <span className="header-text">All Customers</span>
              </div>
              <Input placeholder="Search Customers..."type="text" name="searchCustomer" onChange={this.changeHandler} value={this.state.searchCustomer}/>
              <List link>{customerList}</List>
              </div>
            )
          }
        }/>
      </Switch>

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
export default connect(mapStateToProps, mapDispatchToProps)(Customers)
