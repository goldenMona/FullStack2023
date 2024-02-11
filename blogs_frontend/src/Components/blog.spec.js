import { render,fireEvent } from '@testing-library/react'
import Blog from './blog'
import '@testing-library/jest-dom'
import { prettyDOM } from '@testing-library/react'
import BlogForm from './newBlogForm'

describe('--Component show blogs--', () => {

  let component

  const user = {
    username: 'Testman',
    name: 'M',
    password: 'sal',
    blogs: []
  }

  const blog = {
    title: 'Is a test',
    author: 'Testman',
    url: 'http://testurl.com',
    likes: 1,
    user: user
  }


  const updatedBlogList=jest.fn()
  const likesMock=jest.fn()

  beforeEach(() => {

    component = render(
      <Blog updateBlogList={updatedBlogList} blog={blog} user={user} handleLike={likesMock}/>

    )

  })

  test('The blog component only shows title and author',() => {
    const blog=component.container.querySelector('blog')

    expect(blog).toBeDefined()
  })


  test('The URL and likes show when button "view" is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const blogURL = component.getByTestId('blog-url')
    const blogLikes = component.getByTestId('blog-likes')

    expect(blogURL).toBeInTheDocument()
    expect(blogLikes).toBeInTheDocument()
  })

  test('Two clicks on like button ',() => {
    //Esta porcion de codigo hace que acceda directamente al blog completo
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)


    const likeButton = component.getByTestId('likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likesMock).toHaveBeenCalledTimes(2)
  })

  test ('Form create Blog call a event controller',() => {

    const createMock=jest.fn()
    const form = render (<BlogForm createBlog={createMock}/>)
    const button= form.getByText('Create')
    fireEvent.click(button)


    expect(createMock).toHaveBeenCalledTimes(1)

  })

})

