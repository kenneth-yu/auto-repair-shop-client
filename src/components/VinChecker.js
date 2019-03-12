import React from 'react'
import {connect} from 'react-redux'
import {vinTextChanger} from '../Redux/actions'

class VinChecker extends React.Component{
  state = {
    vinInputBox: "",
    badVin: false,
    manualInsert: false,
    year:"",
    make: "",
    model: "",
    transmission: ""
  }

  changeHandler = (event) => {
    this.setState({
      vinInputBox: event.target.value
    })
  }

  submitHandler = () => {
    let vin = this.state.vinInputBox
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
    .then(res => res.json())
    .then(carData =>{
      console.log(carData)
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
          badVin: true
        })
      }}).catch(error => this.setState({
      badVin: true
    }))
  }

  clickHandler = () => {
    this.setState({
      manualInsert: !this.state.manualInsert
    })
  }

  render() {
    // Prelude - JHMBB61461C004723
    // Integra - JH4DA345XKS022633
    // Supra - JT2JA81L4S0031188
    return (
      <div className="App">
        {!this.state.manualInsert ? <input type="text" name="vin" onChange={this.changeHandler} value={this.state.vinInputBox}/> : null}
        {!this.state.manualInsert ? <input type="button" name="vin-submit" onClick={this.submitHandler} value="Submit"/> : null}
        {this.state.badVin ? " Invalid VIN Number! Please Try Again or Use Manual Insertion!" : null}<br/>
        <span>Year: {this.state.year}</span>
        {this.state.manualInsert ? <input type="text" name="year"/> : null}<br/>
        <span>Make: {this.state.make}</span>
        {this.state.manualInsert ? <input type="text" name="make"/> : null}<br/>
        <span>Model: {this.state.model}</span>
        {this.state.manualInsert ? <input type="text" name="model"/> : null}<br/>
        <span>Transmission: {this.state.transmission}</span>
        {this.state.manualInsert ? <input type="text" name="transmission"/> : null}<br/>
        {this.state.manualInsert ? <input type="button" name="submit" value="Submit"/> : null}<br/>
        <span className="pseudolink" onClick={this.clickHandler}>Manual Insertion</span><br/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    badVin: state.badVin,
    manualInsert: state.manualInsert,
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return{
//     vinTextChange:(text) => dispatch(vinTextChanger)
//   }
// }
export default connect(mapStateToProps, {vinTextChanger})(VinChecker);
