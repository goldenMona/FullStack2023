const blogRouter = require('express').Router()
//const User = require('../models/user')
const Blog = require('../models/blog')
//const jwt = require('jsonwebtoken')




/*const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}*/

blogRouter.get('/', async (request, response) => {
    
    const blogs= await Blog.find({}).populate('user')
        
    response.json(blogs)
        
})

/* tokenExtractor se ejecutará antes de la función de callback de tu ruta POST.
Esto significa que cuando llegues a la función de callback, request.token ya debería contener el token */
blogRouter.post('/',async (request, response,) => {
   
    const body= request.body
    const user = request.user
    

    if(!body.likes){
        body.likes=0
    }
    if(!body.title || ! body.url){
        response.status(400)
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user:user._id
    })
   
    const savedBlog=await blog.save()
    user.blogs=user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
    
   
})

blogRouter.delete('/:id',async(request,response)=>{
      
   
    const userid = request.user
    const blog=await Blog.findById(request.params.id)

    if ( blog.user.toString() === userid._id.toString() ) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
   
    response.status(400).json({error:'the user who entered is not the creator of the blog'})
    

    
})

blogRouter.put('/:id',async(request,response)=>{

    const body=request.body

    const upBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    await Blog.findByIdAndUpdate(request.params.id,upBlog,{new:true})
    response.json(upBlog)
})

module.exports=blogRouter