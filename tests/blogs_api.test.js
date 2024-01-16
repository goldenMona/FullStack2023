const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

const api = request(app)

console.log(request(app).get('/api/blogs'))

test('there are one blog', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(1)
})
test('blog posts have an id property', async () => {

    const response = await api.get('/api/blogs')
    //response contiene la respuesta de la solicitud echa, por lo tanto contiene los headers,body(los blogs)
    //y el status
    //Asigno el contenido(el body de la resuesta) que es donde estan los blogs
    const blogs=response.body
    //Ahora blogs es un array de blogs que contiene cada blog de la base de datos

    blogs.forEach((blogs)=>{
        //con un forEach itero cada blog y compruebo de para cada uno
        //la propiedad id este definida
        expect(blogs.id).toBeDefined()
    })    
})
test('new blog added!',async()=>{

    const actualBlogs= await api.get('/api/blogs')
    const length=actualBlogs.body.length

    const newBlog ={
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response =await api.get('/api/blogs')

    expect(response.body).toHaveLength(length+1)
              
})
test('the like property is missing',async()=>{

    const newBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://testurl.com',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)

})

test('delete a blog', async ()=>{

    const length = (await api.get('/api/blogs')).body.length

    await api.delete('/api/blogs/659da225734ceaa7e76772c5')
    const response= await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(length-1)
})
test('update a blog',async()=>{
    
    const newBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 3
    }

    const response = await api
        .put('/api/blogs/659d82fc4e22502843dc236e')
        .send(newBlog)
        .set('Accept', 'application/json')
        .expect(200) // Esperar una respuesta HTTP 200
        

    expect(response.body).toEqual(newBlog)
        
})
afterAll(() => {
    mongoose.connection.close()
})