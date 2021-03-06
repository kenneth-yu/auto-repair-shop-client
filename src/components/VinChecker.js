import React from 'react'
import {connect} from 'react-redux'
import {addNewCar} from '../Redux/actions'
import { Button, Form,Icon} from 'semantic-ui-react'
import Select from 'react-select'
import {withRouter} from 'react-router'

class VinChecker extends React.Component{
  state = {
    vinInputBox: "",
    badVin: false,
    manualInsert: false,
    year:"",
    make: "",
    model: "",
    color: "",
    img: "",
    selectedCustomer: {}
  }

  componentDidUpdate(){
    if (this.props.redirect === true){
      this.props.history.push(`/cars/${this.props.redirectTo}`)
    }
  }

  componentWillUnmount(){
    if (this.props.redirect === true){
      this.props.resetShowRedirect()
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setValues = (values) => {
    console.log(values.value)
    this.setState({selectedCustomer: values.value})
  }

  submitHandler = () => {
    let vin = this.state.vinInputBox
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
    .then(res => res.json())
    .then(carData =>{
      if (carData.Results[8].Value !== null || carData.Results[5].Value !== null || carData.Results[7].Value !== null){
        // console.log(carData)
        fetch(`https://www.googleapis.com/customsearch/v1?q=
          ${this.state.color !== "" ? this.state.color : ""}
          ${carData.Results[8].Value}+
          ${carData.Results[5].Value}+
          ${carData.Results[7].Value}
          &key=AIzaSyC4ioqvLK7y-euwThbV9-SxA91Cmc_Q5l4&cx=002150306261698239956:6eg27cbcjlg&searchType=image`)
        .then(res=> res.json())
        .then(data => {
          console.log(data)
          // console.log(data)
          this.setState({
            badVin: false,
            year: carData.Results[8].Value,
            make: carData.Results[5].Value,
            model: carData.Results[7].Value,
            img: data.items[0].link,
            transmission: carData.Results[45].Value
          })
        })
          //data.items[0].pagemap.cse_image[0].src

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


  render() {
    // Prelude - JHMBB61461C004723
    // Integra - JH4DA345XKS022633
    // Supra - JT2JA81L4S0031188
    return (
      <div className="car-form">
        <h1>New Car Form</h1>
        {this.state.img !== "" ? <div ><img className="img-div" width={"80%"}  alt="" src={this.state.img}/></div> : null}
        <div className="drop-down">
          <Select placeholder="Select a Customer..." options={this.props.options} onChange={(values) => this.setValues(values)} />
        </div>
        <Form.Input icon={<Icon name='search' inverted circular link onClick={this.submitHandler}/>} placeholder="Vin Number..." type="text" name="vinInputBox" onChange={this.changeHandler} value={this.state.vinInputBox}/><br/>
        {this.state.badVin ? <span className="text">Invalid VIN Number! Please Try Again or Use Manual Insertion!</span>: null}<br/>
        <Form.Input placeholder="Year..." type="text" name="year" onChange={this.changeHandler} value={this.state.year}/><br/>
        <Form.Input placeholder="Make..." type="text" name="make" onChange={this.changeHandler} value={this.state.make}/><br/>
        <Form.Input placeholder="Model..." type="text" name="model" onChange={this.changeHandler} value={this.state.model}/><br/>
        <Form.Input placeholder="Color..." type="text" name="color" onChange={this.changeHandler} value={this.state.color}/><br/>
        <br/>
        <Button type="button" name="submit"
        onClick={() => this.props.addNewCar(this.state.vinInputBox, this.state.year, this.state.make, this.state.model, this.state.color, this.state.selectedCustomer, this.state.img)}>
        Submit New Car
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    redirect: state.reducer.redirect,
    redirectTo: state.reducer.redirectTo
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addNewCar:(vin, year, make, model, color, customer, img) => dispatch(addNewCar(vin, year, make, model, color, customer, img)),
    resetShowRedirect: () => dispatch({type:"RESET_SHOW_REDIRECT", payload: null})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VinChecker));
