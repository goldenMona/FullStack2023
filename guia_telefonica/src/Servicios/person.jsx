import axios from "axios";

const url='http://localhost:3001/api/persons'

const getAll=()=>{
    const request=axios.get(url)
    return request.then(response=>response.data)
}

const create=newPerson=>{

    const request = axios.post(url,newPerson)
    return request.then(response => response.data)
    
}

const suprimir= id =>{
   const request = axios.delete(`${url}/${id}`)
   return request.then(response=>response.data)
}

const update=(id,person)=>{
    const request=axios.put(`${url}/${id}`,person)
    return request.then(response=>response.data)
}
export default {getAll,create,suprimir,update}