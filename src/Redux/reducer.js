
const initialState = {
  badVin: false,
  manualInsert: false,
  currentUser: {},
  allJobs: [],
  allCustomers: [],
  allCars:[]
}


export default function reducer(state = initialState, action) {
  switch (action.type){

    case "AUTHENTICATE_USER":
      return  {...state, currentUser: action.payload}

    case "GET_ALL_JOBS":
      return {...state, allJobs: action.payload}

    case "GET_ALL_CUSTOMERS":
      return{...state, allCustomers: action.payload}

    case "GET_ALL_CARS":
      return{...state, allCars: action.payload}

    case "POST_NEW_CUSTOMER":
      return {...state, allCustomers: [...state.allCustomers, action.payload]}

    case "POST_NEW_JOBS":
      return {...state, allJobs: [...state.allJobs, action.payload]}

    case "POST_NEW_CARS":
      return {...state, allCars: [...state.allCars, action.payload]}

    default:
      return state
  }
}
