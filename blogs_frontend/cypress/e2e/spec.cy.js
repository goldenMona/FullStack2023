
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user ={
      name: 'Davi',
      username: 'testman',
      password: 'tipetin'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173/')

    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testman')
      cy.get('#password').type('tipetin')
      cy.get('#buttonLogin').click()
      cy.contains('logedd in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#buttonLogin').click()
      cy.contains('Wrong credentials')

    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login( { username:'testman',password:'tipetin' })

    })

    it('A blog can be created', function() {

      cy.get('#buttonNewBlog').click()
      cy.get('#title').type('cypress created a blog')
      cy.get('#author').type('Davi')
      cy.get('#url').type('http//culo/sv')
      cy.get('#createBlog').click()

      cy.contains('cypress created a blog')
    })


    it('User can like a Blog',function(){
      cy.get('#buttonNewBlog').click()
      cy.get('#title').type('cypress created a blog')
      cy.get('#author').type('Davi')
      cy.get('#url').type('http//culo/sv')
      cy.get('#createBlog').click()
      cy.get('#buttonView').click()
      cy.get('#buttonLike').click()

      cy.get('#likes').contains('likes:1')
    })

    it('user can delete a Blog',function(){
      cy.createBlog({
        title:'Arroz',
        author:'XD',
        url:'http://localhost:5555/'
      })
      cy.get('#buttonView').click()
      cy.get('#buttonDelete').click()
      cy.contains('Arroz').should('not.exist')
    })

    it('Only creator can delete a blog',function(){
      const user2={
        name: 'user2',
        username: 'testman2',
        password: 'tipeton'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.login({username:'testman2',password:'tipeton'})
      cy.createBlog({
        title:'Caracoles',
        author:'DX',
        url:'http://localhost:7777/'
      })
      cy.get('#buttonlogOut').click()
      cy.login({username:'testman',password:'tipetin'})
      cy.get('#buttonView').click()
      cy.get('#buttonDelete').should('not.exist')

    })
  })



})