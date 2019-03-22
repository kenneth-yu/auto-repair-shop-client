import React from 'react'
import {connect} from 'react-redux'
import {addNewCar} from '../Redux/actions'
import { Input, Button, Form} from 'semantic-ui-react'

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
      <div className="App">
        <span className="text">Vin Number: </span><Form.Input type="text" name="vinInputBox" onChange={this.changeHandler} value={this.state.vinInputBox}/>
        <Button type="button" name="vin-submit" onClick={this.submitHandler} value="Search">Search</Button><br/>
        {this.state.badVin ? " Invalid VIN Number! Please Try Again or Use Manual Insertion!" : null}<br/>
      <span className="text">Year: </span><Form.Input type="text" name="year" onChange={this.changeHandler} value={this.state.year}/><br/>
      <span className="text">Make: </span><Form.Input type="text" name="make" onChange={this.changeHandler} value={this.state.make}/><br/>
      <span className="text">Model: </span><Form.Input type="text" name="model" onChange={this.changeHandler} value={this.state.model}/><br/>
      <span className="text">Color: </span><Form.Input type="text" name="color" onChange={this.changeHandler} value={this.state.color}/><br/>
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
