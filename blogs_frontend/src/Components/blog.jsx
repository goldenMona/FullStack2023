import { useState } from 'react'
import blogService from '../Services/blog'
import PropTypes from 'prop-types'

const Blog = ({ blog ,updateBlogList,user,handleLike }) => {

  const [visible,setVisible]=useState(false)

  const handleVisible=() => {
    setVisible(!visible)
  }

  /*const handleLike=async() => {
    console.log(blog.id)

    const updateBlog={
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }
    console.log(blog.likes)
    console.log(updateBlog.likes)
    await blogService.put(blog.id,updateBlog)

    updateBlogList()
  }*/

  const handleDelete=async() => {

    if(window.confirm('Do you want delete this blog:'+ blog.title)){
      await blogService.supr(blog.id)
      updateBlogList()
    }

  }

  const btnDelete=() => {

    console.log(blog.user)


    if(user.username===blog.user.username){
      return(
        <p><button onClick={handleDelete} id='buttonDelete'>DELETE</button></p>
      )
    }

    return(
      <p></p>
    )

  }


  if(!visible){
    return(
      <div className="blog">
        <li>Title:{blog.title} <button onClick={handleVisible} id='buttonView'>view</button> </li>

      </div>

    )
  }

  return(
    <div className="blogCompleto">
      <li>
        {blog.title}<button onClick={handleVisible}>hide</button>
        <p data-testid="blog-url">{blog.url}</p>
        <p data-testid="blog-likes" id='likes'>likes:{blog.likes} <button onClick={() => {handleLike(blog)}} data-testid='likeButton' id='buttonLike' >Like</button></p>
        <p>Author: {blog.author}</p>
        {btnDelete()}

      </li>
    </div>
  )

}

//Props definidos como obligatorios
Blog.propTypes ={
  updateBlogList : PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}



export default Blog