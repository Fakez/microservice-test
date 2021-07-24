const mongoose = require('mongoose')

const greatPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  country: {
    type: String,
    required: true,
    minlength: 1
  },
})

greatPlaceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const GreatPlace = mongoose.model('GreatPlace', greatPlaceSchema)

module.exports = GreatPlace;