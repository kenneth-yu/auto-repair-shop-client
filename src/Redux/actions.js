// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';


export function authenticateUser(username, password) {
  return (dispatch) => {
    let user = {username: username, password: password}
    return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/login`, {
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

export function getUserWithToken(){
  return(dispatch) =>{
    let token = localStorage.token
    if (token){
      return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        }
      }).then(res => res.json())
      .then(data => {
        if (data.message){
          localStorage.removeItem('token')
        }
        else{
          dispatch({type: "AUTHENTICATE_USER", payload: data.user})
        }
      })
    }
  }
}

export function createUser(username, password, passwordConfirm){
  return (dispatch) => {
    let user = {username: username, password: password}
    if (username !== "" && password !== "" && passwordConfirm !== ""){
        if(password === passwordConfirm){
          return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/users`, {
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
    return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/jobs`,{
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
    return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/customers`,{
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
    return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/cars`,{
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
    if (name && address && dob){
      return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/customers`,{
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
    else{
      window.alert("Please fill in ALL fields!")
    }
  }
}

export function addNewJob(user, car, quote, job_name, notes){
  // console.log(user)
  // console.log(car)
  return (dispatch)=> {
    let newJob = {user_id: user.id, car_id: car, quote:quote, job_name:job_name, notes:notes}
    if (user && car && quote !== -1 && job_name){
      return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/jobs`,{
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
      })
    }
    else{
      window.alert("A Customer and Car must be selected. Please Specify a Job Name and a Quote.")
    }
  }
}

export function addNewCar(vin, year, make, model, color, customer){
  return (dispatch)=> {
    let newCar = {vin: vin, year: year, make: make, model:model, color:color, customer_id:customer}
    if (vin && year && make && model && color && customer){
      return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/cars`,{
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
    else{
      console.log(vin, year, make, model, color, customer)
      window.alert("Please select a Customer and fill in ALL fields!")
    }
  }
}

export function toggleJobStatus(jobDetails){
  return (dispatch)=> {
    console.log(jobDetails)
    return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/jobs/${jobDetails.id},`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body:JSON.stringify({status: !jobDetails.status })
    }).then(res => res.json())
    .then(data => {
      dispatch({type: "TOGGLE_JOB_STATUS", payload:data})
    })
  }
}

export function updateCarDetails(id, vin, year, make, model, color){
  let carDetails = {id: id, vin: vin, year: year, make: make, model: model, color: color}
  return (dispatch)=> {
          return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/cars/${carDetails.id},`,{
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          },
          body:JSON.stringify({car: carDetails})
        }).then(res => res.json())
        .then(data => {
          dispatch({type: "UPDATE_CAR_DETAILS", payload:data})
        })
  }
}

export function updateCustomerDetails(id, name, address, dob, balance){
  let customerDetails = {id:id , name:name, address:address, dob:dob, balance:balance}
  return (dispatch)=> {
          return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/customers/${customerDetails.id},`,{
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          },
          body:JSON.stringify({customer: customerDetails})
        }).then(res => res.json())
        .then(data => {
          dispatch({type: "UPDATE_CUSTOMER_DETAILS", payload:data})
        })
  }
}

export function updateJobDetails(id, name, car, quote, status, notes){
  let jobDetails = {id:id, name:name, car:car, quote:quote, status:status, notes:notes}
  return (dispatch)=> {
          return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/jobs/${jobDetails.id},`,{
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          },
          body:JSON.stringify({job: jobDetails})
        }).then(res => res.json())
        .then(data => {
          dispatch({type: "UPDATE_JOB_DETAILS", payload:data})
        })
  }
}

export function deleteJobDetails(id){
  let jobDetails = {id:id}
  console.log(id)
  return (dispatch)=> {
          return fetch(`https://auto-repair-shop-server.herokuapp.com/api/v1/jobs/${jobDetails.id},`,{
          method:'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          },
        }).then(res => res.json())
        .then(data => {
          dispatch({type: "DELETE_JOB", payload:id})
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
