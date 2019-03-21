import React from 'react'
import {connect} from 'react-redux'
import QueueCard from '../components/QueueCard'
import {getJobs} from '../Redux/actions'
import { Card, Grid} from 'semantic-ui-react'

class QueueContainer extends React.Component{
  componentDidMount(){
    this.props.getJobs()
  }
  render(){
    // console.log(this.props.allJobs)
    if (this.props.allJobs.length > 0){
      let allJobList = this.props.allJobs.map(oneJob => <QueueCard key={oneJob.id} jobDetails={oneJob}/>)
    return(
      <div className="queue-card-container">
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
        {allJobList}
        </Grid.Row>
      </Grid>
      </div>
    )
  }
  else{
    return null
  }
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
