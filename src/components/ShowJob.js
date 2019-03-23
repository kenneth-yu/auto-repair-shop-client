import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import {connect} from 'react-redux'
import {updateJobDetails} from '../Redux/actions'
import {getCars, deleteJobDetails, getCustomers} from '../Redux/actions'
import { Redirect } from 'react-router-dom'
import {Card, Image, Button, Input, List, Grid} from 'semantic-ui-react'
import CarCard from './CarCard'
import CustomerCard from './CustomerCard'

class ShowJob extends React.Component{
  state = {
    edit: false,
    redirect: false,
    job_name: this.props.job.job_name,
    car: this.props.job.car,
    quote: this.props.job.quote,
    status:this.props.job.status,
    notes:this.props.job.notes
  }

  componentDidMount(){
    this.props.getCars()
    this.props.getCustomers()
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
    const {allCars, allCustomers} = this.props
    if (allCars.length !== 0 ){
      let relevantCustomer
      let relevantCar = allCars.find(oneCar => oneCar.id === this.props.job.car_id)
      if(allCustomers.length !==0){
        relevantCustomer = allCustomers.find(oneCustomer => oneCustomer.id === relevantCar.customer_id)
      }
    return(
      <div>
      <SidebarContainer/>
      <div className="show-customer-card">
        <Grid centered columns={2}>
          <Grid.Row>
          <Grid.Column width={4}>
        <Card centered>
        <Image src="http://www.oogazone.com/wp-content/uploads/2018/07/top-10-businessman-counts-money-pop-art-avatar-character-vector-drawing.jpg"/>
        <Card.Content>
        <Card.Description>
        Job: {this.state.edit ? <Input type="text" name="job_name" onChange={this.changeHandler} value={this.state.job_name}/> : this.props.job.job_name}<br/>
        Quote: {this.state.edit ? <Input type="text" name="quote" onChange={this.changeHandler} value={this.state.quote}/> :this.props.job.quote}<br/>
        Status: {this.state.edit ? <Input type="text" name="status" onChange={this.changeHandler} value={this.state.status}/> :(this.props.job.status ? "Completed":"In Progress")}<br/>
        Notes: {this.state.edit ? <Input type="text" name="notes" onChange={this.changeHandler} value={this.state.notes}/> : this.props.job.notes}
        </Card.Description>
        {this.state.edit ?
          <Button type="button" name="submit" onClick={() => {
            this.props.updateJobDetails(this.props.job.id, this.state.job_name, this.state.car, this.state.quote, this.state.status, this.state.notes)
            this.setState({edit:!this.state.edit})
          }} value="Submit Edit">Submit Edit</Button>
        : null }<br/>
        <Button type="button" name="edit" onClick={this.toggleEdit} value="Edit Job Details">
        Edit Job Details
        </Button>
        <Button type="button" name="delete" onClick={() => {
          this.props.deleteJobDetails(this.props.job.id)
          this.setState({redirect: !this.state.redirect})
        }} value="Delete Job">
        Delete Job
        </Button>
        {this.state.redirect ? <Redirect to="/jobs"/> : null}
        </Card.Content>
        </Card>
        </Grid.Column>
        <Grid.Column width={4}>
        <Card.Content className="owned-cars">
        <span className="header-text">Customer:</span>
          <List link >
          {relevantCustomer ? <CustomerCard key={relevantCustomer.id} customerDetails={relevantCustomer}/>: null}
          </List>
          <br/><br/>
        <span className="header-text">Car:</span>
          <List link >
          {relevantCar ? <CarCard key={relevantCar.id} carDetails={relevantCar}/> : null}
          </List>
          </Card.Content>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </div>
    )
  }
  else{
    return null
  }
}
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateJobDetails: (id, name, car, quote, status, notes) => dispatch(updateJobDetails(id, name, car, quote, status, notes)),
    getCars: () => dispatch(getCars()),
    getCustomers: () => dispatch(getCustomers()),
    deleteJobDetails: (id) => dispatch(deleteJobDetails(id))
  }
}

const mapStateToProps = (state) => {
  return{
    allCars: state.reducer.allCars,
    allCustomers: state.reducer.allCustomers
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowJob)
