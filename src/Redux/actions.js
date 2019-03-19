// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';


export function authenticateUser(username, password) {
  return (dispatch) => {
    let user = {username: username, password: password}
    return fetch(`http://localhost:3000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({user})
    }).then(res => res.json())
    .then(data =>{
      if (data.message){
        window.alert(data.message)
      }
      else{
        localStorage.setItem("token", data.jwt)
        dispatch({type: "AUTHENTICATE_USER", payload: data.user});
      }
    }).catch(error => console.log(error))

  }
}

export function createUser(username, password, passwordConfirm){
  return (dispatch) => {
    let user = {username: username, password: password}
    if (username !== "" && password !== "" && passwordConfirm !== ""){
        if(password === passwordConfirm){
          return fetch(`http://localhost:3000/api/v1/users`, {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({user})
          }).then(res => res.json())
          .then(data => {
            if(data.error){
              window.alert("Unable to create account! Please Try Again!")
            }
            localStorage.setItem("token", data.jwt)
            dispatch({type: "AUTHENTICATE_USER", payload: data.user});
          })
        }
        else{
          window.alert("Password and Confirm Password Fields do not match!")
        }
    }
    else{
      window.alert("Please Fill In Username, Password, and Confirm Password Fields!")
    }
  }
}

export function getJobs(){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/jobs`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => dispatch({type: "GET_ALL_JOBS", payload: data}))
  }
}
export function getCustomers(){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/customers`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => dispatch({type: "GET_ALL_CUSTOMERS", payload: data}))
  }
}
export function getCars(){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/cars`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => dispatch({type: "GET_ALL_CARS", payload: data}))
  }
}

export function addNewCustomer(name, address, dob){
  return (dispatch)=> {
    let customer = {name:name, address:address, dob:dob}
    return fetch(`http://localhost:3000/api/v1/customers`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body:JSON.stringify({customer})
    })
    .then(res => res.json())
    .then(data => {
      dispatch({type: "POST_NEW_CUSTOMER", payload: data})
      window.alert("New Customer Added Successfully")
    })
  }
}

export function addNewJob(user, car, quote, job_name, notes){
  return (dispatch)=> {
    let newJob = {user_id: user.id, car_id: car.id, quote:quote, job_name:job_name, notes:notes}
    return fetch(`http://localhost:3000/api/v1/jobs`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body:JSON.stringify({job: newJob})
    })
    .then(res => res.json())
    .then(data => {
      dispatch({type: "POST_NEW_JOBS", payload: data})
      window.alert("New Job Added Successfully")
    })
  }
}

export function addNewCar(vin, year, make, model, color, customer){
  return (dispatch)=> {
    let newCar = {vin: vin, year: year, make: make, model:model, color:color, customer_id:customer.id}
    return fetch(`http://localhost:3000/api/v1/cars`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body:JSON.stringify({car: newCar})
    })
    .then(res => res.json())
    .then(data => {
      dispatch({type: "POST_NEW_CAR", payload: data})
      window.alert("New Car Added Successfully!")
    })
  }
}

// export function vinAPI(vin){
//   fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
//   .then(res => res.json())
//   .then(carData =>{
//
//     if (carData.Results[8].Value !== null || carData.Results[5].Value !== null || carData.Results[7].Value !== null){
//       dispatch({type: "CHECK_VIN_NUMBER", payload:carData})
//
//     }
//     else{
//       this.setState({
//         badVin: true
//       })
//     }}).catch(error => this.setState({
//     badVin: true
//   }))
// }
