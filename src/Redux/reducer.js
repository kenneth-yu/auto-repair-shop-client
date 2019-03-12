//can do initial fetch here

const initialState = {
  badVin: false,
  manualInsert: false,
}


const reducer = (state = initialState, action) => {
  switch (action.type){

    // case "CHANGE_TEXT_VALUE":
    //   console.log(action.payload)
      // return vinInputBox: action.payload

    default:
      return state
  }
}

export default reducer
