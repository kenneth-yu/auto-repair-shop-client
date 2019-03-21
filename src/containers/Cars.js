import React from 'react'
import {connect} from 'react-redux'
import CarCard from '../components/CarCard'
import {getCars} from '../Redux/actions'
import SidebarContainer from './SidebarContainer'
import { Route, Switch } from "react-router-dom";
import ShowCar from '../components/ShowCar'
import { Input, Button, List } from 'semantic-ui-react'


class Cars extends React.Component{
  state = {
    searchCar: "",
    sortBy: "",
    filteredCars: this.props.allCars
  }

  componentDidMount(){
    this.props.getCars()
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render(){
    let filteredCars = this.props.allCars
    if(this.state.sortBy === "YEAR"){
      //CURRENTLY THROWING AN ERROR
      filteredCars = this.props.allCars.filter(oneCar => oneCar.year.toString().includes(this.state.searchCar))
    }
    else if (this.state.sortBy === "MAKE"){
      filteredCars = this.props.allCars.filter(oneCar => oneCar.make.toLowerCase().includes(this.state.searchCar.toLowerCase()))

    }
    else if (this.state.sortBy === "MODEL"){
      filteredCars = this.props.allCars.filter(oneCar => oneCar.model.toLowerCase().includes(this.state.searchCar.toLowerCase()))

    }
    else if (this.state.sortBy === "COLOR"){
      filteredCars = this.props.allCars.filter(oneCar => oneCar.color.toLowerCase().includes(this.state.searchCar.toLowerCase()))

    }
    let carList = filteredCars.map(car => <CarCard key={car.id} carDetails={car}/>)
    return(
      <Switch>
        <Route path="/cars/:id" render={
          routerProps => {
          let id = parseInt(routerProps.match.params.id)
          let car = this.props.allCars.find(oneCar => oneCar.id === id)
          return (car ? <ShowCar car={car} /> : null)
          }
        }/>
      <Route exact path="/cars" render={
        ()=>{
          return (
            <div>
              Sort By: <Button type="button" onClick={this.changeHandler} className="sort-btn" name="sortBy" value="YEAR">YEAR</Button>
              <Button type="button" onClick={this.changeHandler} className="sort-btn" name="sortBy" value="MAKE">MAKE</Button>
              <Button type="button" onClick={this.changeHandler} className="sort-btn" name="sortBy" value="MODEL">MODEL</Button>
              <Button type="button" onClick={this.changeHandler} className="sort-btn" name="sortBy" value="COLOR">COLOR</Button>
              <SidebarContainer/>
              <Input placeholder={"SEARCHING BY..." + this.state.sortBy} type="text" name="searchCar" onChange={this.changeHandler} value={this.state.searchCar}/>
              <List link>
              {carList ? carList : null}
              </List>
            </div>
          )
        }
      }/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    allCars: state.reducer.allCars
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getCars: () => dispatch(getCars())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cars)
