
const BlogForm=(props) => {
  return(
    <div>
      <h1>Create a new Blog!</h1>

      <form onSubmit={props.createBlog}>
        <div>
            Title:<input type="text"  value={props.title} id='title' name="Title" onChange={props.handleTitleChange}></input>
        </div>
        <div>
             Author:<input type="text" value={props.author}id='author' name="Author"onChange={props.handleAuthorChange}></input>
        </div>
        <div>
            Url:<input type="text" value={props.url} id='url' name="url" onChange={props.handleUrlChange}></input>
        </div>
        <button type="submit" id='createBlog'>Create</button>

      </form>
    </div>
  )
}

export default BlogForm