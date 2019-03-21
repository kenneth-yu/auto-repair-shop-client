import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import VinChecker from '../components/VinChecker'
import {connect} from 'react-redux'
import {updateCarDetails} from '../Redux/actions'
import {Card, Image, Button, Input} from 'semantic-ui-react'

class ShowCustomer extends React.Component{

  state = {
    edit: false,
    vin: this.props.car.vin,
    year: this.props.car.year,
    make: this.props.car.make,
    model: this.props.car.model,
    color: this.props.car.color
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
        <Card centered>
        <Image src="https://avatarfiles.alphacoders.com/123/123711.jpg"/>
        <Card.Content>
        <Card.Description>
        Vin: {this.state.edit ? <Input type="text" name="vin" onChange={this.changeHandler} value={this.state.vin}/> : this.props.car.vin}<br/>
        Year: {this.state.edit? <Input type="text" name="year" onChange={this.changeHandler} value={this.state.year}/> : this.props.car.year}<br/>
        Make: {this.state.edit ? <Input type="text" name="make" onChange={this.changeHandler} value={this.state.make}/> :this.props.car.make}<br/>
        Model: {this.state.edit ? <Input type="text" name="model" onChange={this.changeHandler} value={this.state.model}/> : this.props.car.model}<br/>
        Color: {this.state.edit ? <Input type="text" name="color" onChange={this.changeHandler} value={this.state.color}/> : this.props.car.color}<br/>
        </Card.Description>
        {this.state.edit ? <Button type="button" name="submit" onClick={() => {
          this.props.updateCarDetails(this.props.car.id, this.state.vin, this.state.year, this.state.make, this.state.model, this.state.color)
          this.setState({edit:!this.state.edit})
        }} value="Submit Edit">Submit Edit</Button> : null}
        </Card.Content>
        <Button type="button" name="edit" onClick={this.toggleEdit} value="Edit Car Details">
        Edit Car Details
        </Button>
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCarDetails: (id, vin, year, make, model, color) => dispatch(updateCarDetails(id, vin, year, make, model, color))
  }
}


export default connect(null, mapDispatchToProps)(ShowCustomer)