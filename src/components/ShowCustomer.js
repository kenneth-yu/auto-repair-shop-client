import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import {connect} from 'react-redux'
import {updateCustomerDetails} from '../Redux/actions'
import {Card, Image, Button, Input} from 'semantic-ui-react'
import moment from 'moment'

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
      <div className="show-customer-card">
      <SidebarContainer/>
      <Card centered>
        <Image src='https://media.gq.com/photos/5707f229f325b48d09952e3c/master/w_800/bert.jpg' />
        <Card.Content>
          <Card.Header>{this.state.edit ? <Input type="text" name="name" onChange={this.changeHandler} value={this.state.name}/> : this.props.customer.name}</Card.Header>
          <Card.Meta>
          <span className='date'> Member Since: {moment(this.props.customer.created_at).format('YYYY')}</span> <br/>
          </Card.Meta>
        <Card.Description>
        Address: {this.state.edit ? <Input type="text" name="address" onChange={this.changeHandler} value={this.state.address}/> : (this.props.customer.address)}<br/>
        Date of Birth: {this.state.edit ? <Input type="text" name="dob" onChange={this.changeHandler} value={this.state.dob}/> : + this.props.customer.dob}<br/>
        Current Balance: {this.state.edit ? <Input type="text" name="vin" onChange={this.changeHandler} value={this.state.balance}/> : this.props.customer.balance}
        </Card.Description><br/>
        {this.state.edit ?
          <Button type="button" name="submit" onClick={() => {
            this.props.updateCustomerDetails(this.props.customer.id, this.state.name, this.state.address, this.state.dob, this.state.balance)
            this.setState({edit:!this.state.edit})
          }} value="Submit Edit">
          Submit Edit
          </Button>
        : null }
      </Card.Content>
      <Button type="button" name="edit" onClick={this.toggleEdit} value="Edit Customer Details">
      Edit Customer Details
      </Button>
      </Card>
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
