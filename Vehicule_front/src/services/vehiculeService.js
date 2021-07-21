import axios from "axios"
import {base_url, endpoints} from "../config/api.json"


export async function getAllMarques() {

  const response = await axios.get(`${base_url}${endpoints.getAllMarque}`,
        { headers: {
          'Content-Type': 'application/json'
    }})  
    return response.data
}

export async function getMarqueId(code){

  const response = await axios.get(`${base_url}${endpoints.getMarqueId}${code}`,
    { headers: {
      'Content-Type': 'application/json'
    }})  
  return response.data

}

export async function updateMarque(data, code){

  const response = await axios({
    method:'post',
    url:`${base_url}${endpoints.updateMarque}${code}`,
    data:data,
    headers: {
      'Content-Type': 'application/json'
    }
  }); 

  return response.data 

}


export async function addMarque(data){

  const response = await axios({
    method:'post',
    url:`${base_url}${endpoints.addMarque}`,
    data:data,
    headers: {
      'Content-Type': 'application/json'
    }
  }); 

  return response.data 

}

export async function getAllCategories() {

    const response = await axios.get(`${base_url}${endpoints.getAllCategorie}`,
        { headers: {
          'Content-Type': 'application/json'
        }})  
    
    return response.data     
}

export async function getAllVehicule(){

    const response = await axios.get(`${base_url}${endpoints.getAllVehicule}`,
    { headers: {
      'Content-Type': 'application/json'
    }})  

    return response.data 

}


export async function getAllVehiculeId(code){

  const response = await axios.get(`${base_url}${endpoints.getVehiculeByCode}${code}`,
  { headers: {
    'Content-Type': 'application/json'
  }})  

  return response.data 

}

export async function InsertVehicule(data){

    const response = await axios({
        method:'post',
        url:`${base_url}${endpoints.insertVehicule}`,
        data:data,
        headers: {
          'Content-Type': 'application/json'
        }
    }); 
    return response.data 

}

export async function DeleteVehicule(code){

  const response = await axios.delete(`${base_url}${endpoints.deleteVehicule}${code}`, 
  { headers: {
    'Content-Type': 'application/json'
  }})  

  return response.data 

}

export async function UpdateVehicule(code, data){

  const response = await axios({
    method:'put',
    url:`${base_url}${endpoints.updateVehicule}${code}`,
    data:data,
    headers: {
      'Content-Type': 'application/json'
    }
  }); 

  return response.data 

}

export async function getLastVehicule(){

  const response = await axios.get(`${base_url}${endpoints.getLastVehicule}`,
  { headers: {
    'Content-Type': 'application/json'
  }})  
  return response.data

}

export async function searchFilter(data){

  const response = await axios({
    method:'post',
    url:`${base_url}${endpoints.searchFilter}`,
    data:data,
    headers: {
      'Content-Type': 'application/json'
    }
  }); 

  return response.data 

}

export async function vehiculeFilter(data){

  const response = await axios({
    method:'post',
    url:`${base_url}${endpoints.vehiculeFilter}`,
    data:data,
    headers: {
      'Content-Type': 'application/json'
    }
  }); 

  return response.data 

}



