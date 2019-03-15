import React from 'react'
import {connect} from 'react-redux'
import QueueCard from '../components/QueueCard'
import {getJobs} from '../Redux/actions'

class QueueContainer extends React.Component{
  componentDidMount(){
    this.props.getJobs()
  }
  render(){
    // console.log(this.props.allJobs)
    let allJobList = this.props.allJobs.map(oneJob => <QueueCard key={oneJob.id} jobDetails={oneJob}/>)
    return(
      allJobList
    )
  }
}

const mapStateToProps = (state) => {
  return{
    allJobs: state.reducer.allJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: () => dispatch(getJobs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueContainer)
