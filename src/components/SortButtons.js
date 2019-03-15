import React from 'react'

class SortButton extends React.Component{
  render(){
    return(
      <div>
        Sort By: <input type="button" className="sort-btn" name="filter-by-status" value="TIME"/>
        <input type="button" className="sort-btn" name="filter-by-status" value="JOB STATUS"/>
      </div>
    )
  }
}

export default SortButton
