import axios from 'axios'

const url='http://localhost:3003/api/blogs'

//Se asigna el token generado a la variable token
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
//Ahora todas las solicitudes deben contener un token para ser realizadas
const getAll=async () => {

  const config = {
    headers: { Authorization: token },
  }

  try{
    const response= await axios.get(url,config)
    return response.data
  }
  catch(err){
    console.log(err)
  }

}

const post= async(newBlog) => {

  const config = {
    headers: { Authorization: token },
  }

  try{
    const response= await axios.post(url,newBlog,config)
    return response.data
  }
  catch(err){
    console.log(err)
  }
}

const put = async(id,blog) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${url}/${id}`,blog,config)
  return response

}

const supr= async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${url}/${id}`,config)
  return response
}


export default {
  getAll,
  setToken,
  post,
  put,
  supr,

}