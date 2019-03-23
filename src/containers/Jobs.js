import React from 'react'
import {connect} from 'react-redux'
import JobCard from '../components/JobCard'
import {getJobs, getCars} from '../Redux/actions'
import SidebarContainer from './SidebarContainer'
import { Route, Switch } from "react-router-dom";
import ShowJob from '../components/ShowJob'
import { Input, Button, List } from 'semantic-ui-react'
import moment from 'moment'


class Jobs extends React.Component{
  componentDidMount(){
    this.props.getJobs()
    this.props.getCars()
  }

  state = {
    searchJob: "",
    sortBy: "JOB",
    filteredJobs: this.props.allJobs
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // <div>
  // <SidebarContainer/>
  // <ul>{jobList}</ul>
  // </div>

  render(){
    let filteredJobs = this.props.allJobs
    let jobList
     if (this.state.sortBy === "JOB"){
      filteredJobs = this.props.allJobs.filter(oneJob => oneJob.job_name.toLowerCase().includes(this.state.searchJob.toLowerCase()))
    }
    else if (this.state.sortBy === "TIME"){
      filteredJobs = this.props.allJobs.filter(oneJob => moment(oneJob.created_at).format('lll').toLowerCase().includes(this.state.searchJob.toLowerCase()))
    }
    if(filteredJobs.length > 0){
      jobList = filteredJobs.map(oneJob => <JobCard key={oneJob.id} jobDetails={oneJob}/>)
    }

    return(
      <Switch>
        <Route path="/jobs/:id" render={
          routerProps => {
          let id = parseInt(routerProps.match.params.id)
          let job = this.props.allJobs.find(oneJob => oneJob.id === id)
          return (job ? <ShowJob job={job} /> : null)
          }
        }/>
        <Route exact path="/jobs" render={
          ()=>{
            return(
              <div>
              <SidebarContainer/>
              <div className="pad-header">
              <span className="header-text">All Jobs</span><br/><br/>
              <span className="text">Sort By: </span>
              <Button style={this.state.sortBy === "JOB" ? {background:"#3395FF"} : null}
              type="button" onClick={this.changeHandler} className="sort-btn" name="sortBy" value="JOB">JOB</Button>
              <Button style={this.state.sortBy === "TIME" ? {background:"#3395FF"} : null}
              type="button" onClick={this.changeHandler} className="sort-btn" name="sortBy" value="TIME">TIME</Button>
              <Input onChange={this.changeHandler}icon='search' value={this.state.searchJob} name="searchJob" placeholder={'Search By...' + this.state.sortBy} />
              </div>
              <List link>{jobList}</List>
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
    allJobs: state.reducer.allJobs,
    allCars: state.reducer.allCars
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getJobs: () => dispatch(getJobs()),
    getCars: () => dispatch(getCars())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobs)
