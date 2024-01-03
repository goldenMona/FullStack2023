
require('dotenv').config()

const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())


//morgan.token('body', (req) => JSON.stringify(req.body));


/*app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => req.method !== 'POST', // Mostrar el cuerpo solo en solicitudes POST
  })
);*/
app.use(express.json())
let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  }
]


//request se refiere a la solicitud que se hace
//response es como se respode a dicha solicitud
app.get('/api/persons', (request, response) => {
  const content=Person.find({}).then(p=>{
    response.json(p)
  })
  
})

//INFO
app.get('/info', (request, response) => {
  //const date = new Date()
  const infoResponse = '<p>Phonebook has info for ${Person.length} people</p>' +
    '<p>${date}</p>'
  response.send(infoResponse)
  
})


//GET BY ID
app.get('/api/persons/:id', (request, response,next) => {

  Person.findById(request.params.id).then(p => {

    if (p) {
      response.json(p)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
  /*
   const id= Number(request.params.id)
   const person= persons.find(person=>person.id===id)
   */


})


//DELETE
app.delete('/api/persons/:id', (request, response,next) => {

  /*const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
*/
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))

})

//UPDATE
app.put('/api/persons/:id', (request, response,next)=>{
  
  const body= request.body

  const person ={
    name:body.name,
    number:body.number
  }
   
  Person.findByIdAndUpdate(request.params.id,person,{new:true})
    .then(updateP=>{
      response.json(updateP)
    })
    .catch(error => next(error))
})

//POST
app.post('/api/persons', (request, response,next) => {
  const body = request.body
  //const newId=Math.floor(Math.random() * 10000)+1

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })


  person.save().then(saved => {
    response.json(saved)
  })
    .catch(error=>next(error))

})

//MANEJADOR DE ERRORES
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name==='ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.VITE_PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
