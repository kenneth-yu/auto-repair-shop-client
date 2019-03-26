import React from 'react'
import {Button} from 'semantic-ui-react'

class SortButton extends React.Component{
  render(){
    // console.log(this.props.changeHandler)
    return(
      <div className="sortBtnDiv">
        <span className="text">Sort By:</span> <Button style={this.props.sortBy === "TIME" ? {background:"#3395FF"} : null} onClick={(event) => this.props.changeHandler(event)} type="button" className="sort-btn" name="sortBy" value="TIME">
        Time
        </Button>
        <Button  style={this.props.sortBy === "JOB STATUS" ? {background:"#3395FF"} : null} onClick={(event) => this.props.changeHandler(event)} type="button" className="sort-btn" name="sortBy" value="JOB STATUS">
        Job Status
        </Button>
      </div>
    )
  }
}

export default SortButton
