import { useState, useEffect } from 'react'

import './App.css'

import blogService from './Services/blog'

import Blog from './Components/blog'

import loginService from './Services/login'

import Togglable from './Components/Togglable'

import BlogForm from './Components/newBlogForm'







function App() {







  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')

  const [author, setAuthor] = useState('')

  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)





  const updatedBlogList=async() => {



    const db = await blogService.getAll()

    setBlogs(db.slice().sort((a, b) => b.likes - a.likes))



  }



  /*Aquí, el efecto depende de la variable de estado user. Si user cambia entre renderizaciones,

   el efecto se ejecutará de nuevo. Si user no cambia, el efecto no se ejecutará de nuevo. */

  useEffect(() => {

    if (user) {

      updatedBlogList()

    }

  }, [user])



  //se puede hacer uso multiple de los hooks

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)

    }

  }, [])



  const handleLogin = async (event) => {

    event.preventDefault()

    try {

      const user = await loginService.login({

        username, password,

      })

      //Almacena el usuario en local storage de la pagina web

      window.localStorage.setItem(

        'loggedNoteappUser', JSON.stringify(user)

      )

      

      blogService.setToken(user.token)

      setUser(user)

      setUsername('')

      setPassword('')

    } catch (exception) {

      console.log(exception)
      setMessage('Wrong credentials')
      setTimeout(() => {

        setMessage(null)

      }, 5000)

    }

    console.log('logging in with', username, password)

  }





  const handleLogout = () => {

    //vacia el localStorage donde se a almacenado el usuario

    window.localStorage.clear()

    //recarga la pagina llevando al login

    window.location.reload()



  }



  const createBlog = async (event) => {

    event.preventDefault()



    const blogObject = {

      title: title,

      author: author,

      url: url

    }



    const newBlog = await blogService.post(blogObject)

    setBlogs(blogs.concat(newBlog))

    setAuthor('')

    setTitle('')

    setUrl('')

    setMessage('new Blog added: ' + newBlog.title)

    setTimeout(() => {

      setMessage(null)

    }, 5000)



  }



  const loginForm = () => (



    <form onSubmit={handleLogin}>

      <div>

        <h1>Log in to application</h1>
        <Error message={message}/>
        username

        <input

          type="text"

          value={username}

          name="Username"

          id='username'
          //controlador de evento

          onChange={({ target }) => setUsername(target.value)}

        />

      </div>

      <div>

        password

        <input

          type="password"

          value={password}

          name="Password"

          id='password'
          //controlador de eventos

          onChange={({ target }) => setPassword(target.value)}

        />

      </div>

      <button type="submit" id='buttonLogin'>login</button>

    </form>

  )

  const handleLike=async( blog) => {
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

    updatedBlogList()
  }

  const Notification = ({ message }) => {



    if (message === null) {

      return null

    }

    return (

      <div className='notificacion'>

        <h2>{message}</h2>

      </div>

    )

  }

  const Error =({ message }) => {
    if (message === null) {

      return null

    }

    return (

      <div className='error'>

        <h2>{message}</h2>

      </div>

    )

  }

  const mostrarBlogs = () => {



    return (

      <div>



        <div>

          <h1>Blogs</h1>

          <p className='userLogin'>{user.name} logedd in <button onClick={handleLogout} className='btnlogout' id='buttonlogOut'>logout</button></p>

          {blogs.map(blog =>

            <Blog key={blog.id} blog={blog} updateBlogList={updatedBlogList} user={user} handleLike={handleLike}/>

          )}

        </div>

        <div className='formularioBlogs'>

          <Togglable buttonLabel='New Blog'>

            <Notification message={message}></Notification>

            <BlogForm createBlog={createBlog}

              title={title}

              author={author}

              url={url}

              handleTitleChange={({ target }) => setTitle(target.value)}

              handleAuthorChange={({ target }) => setAuthor(target.value)}

              handleUrlChange={({ target }) => setUrl(target.value)}



            />



          </Togglable>

        </div>





      </div>

    )

  }





  return (



    <div className="login">



      {

        user === null ? loginForm() : mostrarBlogs()

      }



    </div>



  )

}



export default App