import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import VinChecker from '../components/VinChecker'
import {connect} from 'react-redux'
import {updateCarDetails} from '../Redux/actions'

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
        <div>
        Vin: <h2>{this.state.edit ? <input type="text" name="vin" onChange={this.changeHandler} value={this.state.vin}/> : this.props.car.vin}</h2><br/>
        Year: <h2>{this.state.edit? <input type="text" name="year" onChange={this.changeHandler} value={this.state.year}/> : this.props.car.year}</h2><br/>
        Make: <h2>{this.state.edit ? <input type="text" name="make" onChange={this.changeHandler} value={this.state.make}/> :this.props.car.make}</h2><br/>
        Model: <h2>{this.state.edit ? <input type="text" name="model" onChange={this.changeHandler} value={this.state.model}/> : this.props.car.model}</h2><br/>
        Color: <h2>{this.state.edit ? <input type="text" name="color" onChange={this.changeHandler} value={this.state.color}/> : this.props.car.color}</h2><br/>
        {this.state.edit ? <input type="button" name="submit" onClick={() => {
          this.props.updateCarDetails(this.props.car.id, this.state.vin, this.state.year, this.state.make, this.state.model, this.state.color)
          this.setState({edit:!this.state.edit})
        }} value="Submit Edit"/> : null}
        </div>
        <input type="button" name="edit" onClick={this.toggleEdit} value="Edit Car Details"/>
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
