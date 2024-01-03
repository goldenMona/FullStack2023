
const mongoose= require('mongoose')
const password = process.argv[2]
const url =
`mongodb+srv://cruzirahetaoscardavid:${password}@cluster0.acxl96g.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
name: String,
number: String,

})

const Person = mongoose.model('Person',personSchema)
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

if (process.argv.length===3){
  console.log('---Phonebook---')
  Person.find({}).then(result => {
    result.forEach(p=> {
      console.log(p)
    })
    mongoose.connection.close()
  })
}
else 
{
  const nom = process.argv[3]
  const num= process.argv[4]
  
  const person = new Person({
    name:nom,
    number:num,
   
  })
  
  person.save().then(result => {
    console.log('added '+nom +' number '+num+ ' to phonebook' )
    mongoose.connection.close()
  })
}
  
  