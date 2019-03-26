import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import {connect} from 'react-redux'
import {updateCarDetails} from '../Redux/actions'
import {Card, Image, Button, Input, Grid, List} from 'semantic-ui-react'
import {getCustomers, getJobs} from '../Redux/actions'
import CustomerCard from './CustomerCard'
import JobCard from './JobCard'

class ShowCustomer extends React.Component{
  componentDidMount(){
    this.props.getCustomers()
    this.props.getJobs()
  }

  state = {
    edit: false,
    vin: this.props.car.vin,
    year: this.props.car.year,
    make: this.props.car.make,
    model: this.props.car.model,
    color: this.props.car.color,
    img: this.props.car.img ? this.props.car.img : ""
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
    let relevantCustomer
    let relevantCustomerList
    let relevantJobs
    let relevantJobList
    if(this.props.allCustomers.length > 0 ){
      relevantCustomer = this.props.allCustomers.filter(oneCustomer => oneCustomer.id === this.props.car.customer_id)
      relevantCustomerList = relevantCustomer.map(oneCustomer => <CustomerCard key={oneCustomer.id} customerDetails={oneCustomer}/>)
    }
    if(this.props.allJobs.length>0){
      relevantJobs = this.props.allJobs.filter(oneJob => oneJob.car_id === this.props.car.id)
      relevantJobList = relevantJobs.map(oneJob => <JobCard key={oneJob.id} jobDetails={oneJob}/>)
    }
    return(
      <div>
      <SidebarContainer/>
      <div className="show-customer-card">
      <Grid centered columns={2}>
        <Grid.Row>
        <Grid.Column width={4}>
        <Card centered>
        <Image src={this.state.img ? this.state.img : "https://www.budget.co.il/en/SVTemplate/img/ltr/car_avatar.png"}/>
        <Card.Content>
        <Card.Description>
        Vin: {this.state.edit ? <Input type="text" name="vin" onChange={this.changeHandler} value={this.state.vin}/> : this.props.car.vin}<br/>
        Year: {this.state.edit? <Input type="text" name="year" onChange={this.changeHandler} value={this.state.year}/> : this.props.car.year}<br/>
        Make: {this.state.edit ? <Input type="text" name="make" onChange={this.changeHandler} value={this.state.make}/> :this.props.car.make}<br/>
        Model: {this.state.edit ? <Input type="text" name="model" onChange={this.changeHandler} value={this.state.model}/> : this.props.car.model}<br/>
        Color: {this.state.edit ? <Input type="text" name="color" onChange={this.changeHandler} value={this.state.color}/> : this.props.car.color}<br/>
        {this.state.edit ? <span>Image URL: </span> : null} {this.state.edit ? (<Input type="text" name="img" onChange={this.changeHandler} value={this.state.img}/>) : null}
        </Card.Description>
        {this.state.edit ? <Button type="button" name="submit" onClick={() => {
          this.props.updateCarDetails(this.props.car.id, this.state.vin, this.state.year, this.state.make, this.state.model, this.state.color, this.state.img)
          this.setState({edit:!this.state.edit})
        }} value="Submit Edit">Submit Edit</Button> : null}
        </Card.Content>
        <Button type="button" name="edit" onClick={this.toggleEdit} value="Edit Car Details">
        Edit Car Details
        </Button>
        </Card>
        </Grid.Column>
        <Grid.Column width={6}>
        <Card.Content className="owned-cars">
        <span className="header-text">Owner:</span>
          <List link >
            {relevantCustomerList}
          </List>
          <br/><br/>
        <span className="header-text">Car History:</span>
          <List link >
            {relevantJobList}
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
  return {
    updateCarDetails: (id, vin, year, make, model, color, img) => dispatch(updateCarDetails(id, vin, year, make, model, color, img)),
    getCustomers: () => dispatch(getCustomers()),
    getJobs: () => dispatch(getJobs())
  }
}

const mapStateToProps = (state) => {
  return{
    allCustomers: state.reducer.allCustomers,
    allJobs: state.reducer.allJobs
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowCustomer)
