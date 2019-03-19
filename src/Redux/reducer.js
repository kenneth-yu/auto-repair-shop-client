
const initialState = {
  currentUser: {},
  allJobs: [],
  allCustomers: [],
  allCars:[],
  dashboard: false,
  newCustomer: false,
  newCar: false,
  newJob: false,
  searchCustomer: false,
  searchCar: false,
  searchJob: false
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

    case "SET_REDIRECT_STATE":
      // console.log(action.payload)
      return {...state, [action.payload]:true }

    case "RESET_REDIRECT_STATE":
      return{...state,
        dashboard: false,
        newCustomer: false,
        newCar: false,
        newJob: false,
        searchCustomer: false,
        searchCar: false,
        searchJob: false }

    default:
      return state
  }
}
