require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
//const Blog = require('./models/blog')
const blogRouter=require('./controllers/blogs')
const cors = require('cors')
const usersRouter=require('./controllers/users')
const loginRouter = require('./controllers/login')
const User= require('./models/user')
const jwt = require('jsonwebtoken')
const testingRouter = require('./controllers/testing')

const url=process.env.MONGODB_URI

mongoose.connect(url)
    .then(result=>{
        console.log('conected to MongoDB')
    })
    .catch(error=>{
        console.log('Error connecting ',error.message)
    })


const tokenExtractor = (request, response, next) => {
    // code that extracts the token
    
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
       
    } 
   
    next()
    
}

const userExtractor=async(request,response,next)=>{
    
    const token= request.token
    console.log(token)
    //el metodo verify devuelve el token decodificado en otras palabras el objeto en el que se baso el token
    const decodedToken = jwt.verify(token,process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    

    next()
}
      
//app.use(tokenExtractor)
app.use(cors())
app.use(express.json())
app.use('/api/testing',testingRouter)
//app.use(userExtractor)
app.use('/api/blogs',tokenExtractor,userExtractor,blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)



module.exports=app