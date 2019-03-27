import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import {connect} from 'react-redux'
import {updateCustomerDetails, getCars} from '../Redux/actions'
import {Card, Image, Button, Input, List, Grid} from 'semantic-ui-react'
import CarCard from './CarCard'
import moment from 'moment'

class ShowCustomer extends React.Component{
  componentDidMount(){
    this.props.getCars()
  }
  state = {
    edit: false,
    name: this.props.customer.name,
    address: this.props.customer.address,
    dob: this.props.customer.dob,
    balance:this.props.customer.balance,
    img: this.props.customer.img ? this.props.customer.img : ""
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
    let relevantCars
    let relevantCarList
    if(this.props.allCars.length > 0 ){
      relevantCars = this.props.allCars.filter(oneCar => oneCar.customer_id === this.props.customer.id)
      relevantCarList = relevantCars.map(oneCar => <CarCard key={oneCar.id} carDetails={oneCar}/>)
    }
    return(
      <div>
      <SidebarContainer/>
      <div className="show-customer-card" >
        <Grid stackable centered columns={2}>
          <Grid.Row>
            <Grid.Column width={4}>
            <Card centered>
              {this.props.customer.img ?  <Image src={this.props.customer.img}/> : <Image src='https://stroseschool.stroselions.net/wp-content/uploads/2018/04/profile-blank-reva.png'/>}
            <Card.Content>
              <Card.Header>{this.state.edit ? <Input type="text" name="name" onChange={this.changeHandler} value={this.state.name}/> : this.props.customer.name}</Card.Header>
              <Card.Meta>
                <span className='date'> Member Since: {moment(this.props.customer.created_at).format('YYYY')}</span> <br/>
              </Card.Meta>
              <Card.Description>
                Address: {this.state.edit ? <Input type="text" name="address" onChange={this.changeHandler} value={this.state.address}/> : (this.props.customer.address)}<br/>
                Date of Birth: {this.state.edit ? <Input type="text" name="dob" onChange={this.changeHandler} value={this.state.dob}/> : this.props.customer.dob}<br/>
                Current Balance: {this.state.edit ? <Input type="text" name="vin" onChange={this.changeHandler} value={(this.props.customer.balance ? this.props.customer.balance : 0 )}/>
                : (this.props.customer.balance ? this.props.customer.balance : 0 )}
                {this.state.edit ? <span>Image URL: </span> : null}{this.state.edit ? (<Input type="text" name="img" onChange={this.changeHandler} value={this.state.img}/>) : null}
              </Card.Description><br/>
          {this.state.edit ?
          <Button type="button" name="submit" onClick={() => {
            this.props.updateCustomerDetails(this.props.customer.id, this.state.name, this.state.address, this.state.dob, this.state.balance, this.state.img)
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
      </Grid.Column>
      <Grid.Column width={5}>
      <Card.Content className="owned-cars">
        <span className="header-text">Owned Cars</span>
        <List link >
          {relevantCarList}
        </List>
      </Card.Content>
      </Grid.Column>
      </Grid.Row>
      </Grid>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateCustomerDetails: (id, name, address, dob, balance, img) => dispatch(updateCustomerDetails(id, name, address, dob, balance, img)),
    getCars: () => dispatch(getCars())
  }
}

const mapStateToProps = (state) => {
  return{
    allCars: state.reducer.allCars
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCustomer)
