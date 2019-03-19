import React from 'react'
import {connect} from 'react-redux'
import JobCard from '../components/JobCard'
import {getJobs} from '../Redux/actions'
import SidebarContainer from './SidebarContainer'
import { Route, Switch } from "react-router-dom";
import ShowJob from '../components/ShowJob'


class Jobs extends React.Component{
  componentDidMount(){
    this.props.getJobs()
  }
  // <div>
  // <SidebarContainer/>
  // <ul>{jobList}</ul>
  // </div>

  render(){
    let jobList = this.props.allJobs.map(oneJob => <JobCard key={oneJob.id} jobDetails={oneJob}/>)
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
              <ul>{jobList}</ul>
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
    allJobs: state.reducer.allJobs
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getJobs: () => dispatch(getJobs())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobs)
