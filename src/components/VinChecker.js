import React from 'react'
import {connect} from 'react-redux'
import {addNewCar} from '../Redux/actions'
import { Button, Form,Icon} from 'semantic-ui-react'
import Select from 'react-select'

class VinChecker extends React.Component{
  state = {
    vinInputBox: "",
    badVin: false,
    manualInsert: false,
    year:"",
    make: "",
    model: "",
    color: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = () => {
    let vin = this.state.vinInputBox
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
    .then(res => res.json())
    .then(carData =>{
      if (carData.Results[8].Value !== null || carData.Results[5].Value !== null || carData.Results[7].Value !== null){
        this.setState({
          badVin: false,
          year: carData.Results[8].Value,
          make: carData.Results[5].Value,
          model: carData.Results[7].Value,
          transmission: carData.Results[45].Value
        })
      }
      else{
        this.setState({
          badVin: true,
          vinInputBox: ""
        })
      }}).catch(error => this.setState({
      badVin: true,
      vinInputBox: ""
    }))
  }

  clickHandler = () => {
    this.setState({
      manualInsert: !this.state.manualInsert
    })
  }

  submitNewCar = (vin, year, make, model, color, customer) => {
    this.props.addNewCar(vin, year, make, model, color, customer)
  }

  render() {
    // Prelude - JHMBB61461C004723
    // Integra - JH4DA345XKS022633
    // Supra - JT2JA81L4S0031188
    return (
      <div className="car-form">
        <h1>New Car Form</h1>
        <div className="drop-down">
          <Select placeholder="Select a Customer..." options={this.props.options} onChange={(values) => this.setValues(values)} />
        </div>
        <Form.Input icon={<Icon name='search' inverted circular link onClick={this.submitHandler}/>} placeholder="Vin Number..." type="text" name="vinInputBox" onChange={this.changeHandler} value={this.state.vinInputBox}/><br/>
        {this.state.badVin ? <span className="text">Invalid VIN Number! Please Try Again or Use Manual Insertion!</span>: null}<br/>
        <Form.Input placeholder="Year..." type="text" name="year" onChange={this.changeHandler} value={this.state.year}/><br/>
        <Form.Input placeholder="Make..." type="text" name="make" onChange={this.changeHandler} value={this.state.make}/><br/>
        <Form.Input placeholder="Model..." type="text" name="model" onChange={this.changeHandler} value={this.state.model}/><br/>
        <Form.Input placeholder="Color..." type="text" name="color" onChange={this.changeHandler} value={this.state.color}/><br/>
        <Button type="button" name="submit"
        onClick={() => this.submitNewCar(this.state.vinInputBox, this.state.year, this.state.make, this.state.model, this.state.color, this.props.selectedCustomer)}>
        Submit New Car
        </Button>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   // console.log(state)
//   return {
//     badVin: state.badVin,
//   }
// }
//
const mapDispatchToProps = (dispatch) => {
  return{
    addNewCar:(vin, year, make, model, color, customer) => dispatch(addNewCar(vin, year, make, model, color, customer))
  }
}
export default connect(null, mapDispatchToProps)(VinChecker);
