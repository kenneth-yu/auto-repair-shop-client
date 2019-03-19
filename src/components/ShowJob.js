import React from 'react'
import SidebarContainer from '../containers/SidebarContainer'
import {connect} from 'react-redux'
import {updateJobDetails} from '../Redux/actions'
import {getCars, getCustomers, deleteJobDetails} from '../Redux/actions'
import { Redirect } from 'react-router-dom'

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
    const {jobDetails, allCars, allCustomers} = this.props
    if (allCars.length !== 0 ){
      let relevantCar = allCars.find(oneCar => oneCar.id === this.props.job.car_id)
    return(
      <div>
        <SidebarContainer/>
        Job: <h2>{this.state.edit ? <input type="text" name="job_name" onChange={this.changeHandler} value={this.state.job_name}/> : this.props.job.job_name}</h2><br/>
        Car: <h2>{this.state.edit ? <input type="text" name="car" onChange={this.changeHandler} value={this.state.car}/> : relevantCar.year + " "+ relevantCar.make + " "+ relevantCar.model}</h2><br/>
        Quote: <h2>{this.state.edit ? <input type="text" name="quote" onChange={this.changeHandler} value={this.state.quote}/> :this.props.job.quote}</h2><br/>
        Status: <h2>{this.state.edit ? <input type="text" name="status" onChange={this.changeHandler} value={this.state.status}/> :(this.props.job.status ? "Completed":"In Progress")}</h2><br/>
        Notes: <h2>{this.state.edit ? <input type="text" name="notes" onChange={this.changeHandler} value={this.state.notes}/> : this.props.job.notes}</h2>
        {this.state.edit ?
          <input type="button" name="submit" onClick={() => {
            this.props.updateJobDetails(this.props.job.id, this.state.job_name, this.state.car, this.state.quote, this.state.status, this.state.notes)
            this.setState({edit:!this.state.edit})
          }} value="Submit Edit"/>
        : null }
        <input type="button" name="edit" onClick={this.toggleEdit} value="Edit Job Details"/>
        <input type="button" name="delete" onClick={() => {
          this.props.deleteJobDetails(this.props.job.id)
          this.setState({redirect: !this.state.redirect})
        }} value="Delete Job"/>
        {this.state.redirect ? <Redirect to="/jobs"/> : null}
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
