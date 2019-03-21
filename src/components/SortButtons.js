import React from 'react'
import {Button} from 'semantic-ui-react'

class SortButton extends React.Component{
  render(){
    return(
      <div>
        <span className="text">Sort By:</span> <Button type="button" className="sort-btn" name="filter-by-status" value="TIME">
        Time
        </Button>
        <Button type="button" className="sort-btn" name="filter-by-status" value="JOB STATUS">
        Job Status
        </Button>
      </div>
    )
  }
}

export default SortButton
