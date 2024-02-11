const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs)=>{
    
    console.log(blogs.length)
    return blogs.length===0 ?
        0
        :
        blogs.reduce((acummulator,blog)=>acummulator+blog.likes,0,blogs)
}
  
const favoriteBlog = (blogs)=>{
    let maxLikes = 0
    let blogFav = null
  
    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            blogFav = blog
        }
    })
  
    return blogFav
}
const mostBlogs= (blogs)=>{
    if (blogs.length === 0) {
        return null
    }
    
    const listAuthors = {}
    
    blogs.forEach((blog) => {
        if (listAuthors[blog.author]) {
            listAuthors[blog.author].blogs += 1
        } else {
            listAuthors[blog.author] = { author: blog.author, blogs: 1 }
        }
    })
    
    let maxBlogs = 0
    let mostBlogsAuthor = null
    
    for (const author in listAuthors) {
        if (listAuthors[author].blogs > maxBlogs) {
            maxBlogs = listAuthors[author].blogs
            mostBlogsAuthor = listAuthors[author]
        }
    }
    
    return mostBlogsAuthor
    
}
  
const mostLikes=(blogs)=>{
  
    if (blogs.length === 0) {
        return null
    }
    
    const listAuthors = {}
    
    blogs.forEach((blog) => {
        if (listAuthors[blog.author]) {
            listAuthors[blog.author].likes += blog.likes
        } else {
            listAuthors[blog.author] = { author: blog.author, likes: blog.likes }
        }
    })
    
    let maxLikes = 0
    let mostLikesAuthor = null
    
    for (const author in listAuthors) {
        if (listAuthors[author].likes> maxLikes) {
            maxLikes = listAuthors[author].likes
            mostLikesAuthor = listAuthors[author]
        }
    }
    
    return mostLikesAuthor
    
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
 
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb
}