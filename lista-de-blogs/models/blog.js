
const mongoose = require('mongoose')



const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})

//Estilizando como se envia el modulo en formato JSON
 
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        //Eliminar el _id  y :_v del modulo 
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  

//exportando el modelo
module.exports=mongoose.model('Blog', blogSchema)