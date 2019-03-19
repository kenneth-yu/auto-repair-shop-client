import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import {connect} from 'react-redux'
import {updateCustomerDetails} from '../Redux/actions'

class ShowCustomer extends React.Component{
  state = {
    edit: false,
    name: this.props.customer.name,
    address: this.props.customer.address,
    dob: this.props.customer.dob,
    balance:this.props.customer.balance
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  toggleEdit = () =>{
    this.setState({
      edit: !this.state.edit
    })
  }

  render(){
    return(
      <div>
        <SidebarContainer/>
        Name: <h2>{this.state.edit ? <input type="text" name="name" onChange={this.changeHandler} value={this.state.name}/> : this.props.customer.name}</h2><br/>
        Address: <h2>{this.state.edit ? <input type="text" name="address" onChange={this.changeHandler} value={this.state.address}/> : this.props.customer.address}</h2><br/>
        Date of Birth: <h2>{this.state.edit ? <input type="text" name="dob" onChange={this.changeHandler} value={this.state.dob}/> : this.props.customer.dob}</h2><br/>
        Current Balance: <h2>{this.state.edit ? <input type="text" name="vin" onChange={this.changeHandler} value={this.state.balance}/> : this.props.customer.balance}</h2>
        {this.state.edit ?
          <input type="button" name="submit" onClick={() => {
            this.props.updateCustomerDetails(this.props.customer.id, this.state.name, this.state.address, this.state.dob, this.state.balance)
            this.setState({edit:!this.state.edit})
          }} value="Submit Edit"/>
        : null }
        <input type="button" name="edit" onClick={this.toggleEdit} value="Edit Customer Details"/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateCustomerDetails: (id, name, address, dob, balance) => dispatch(updateCustomerDetails(id, name, address, dob, balance))
  }
}

export default connect(null, mapDispatchToProps)(ShowCustomer)
