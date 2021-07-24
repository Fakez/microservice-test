
const logger = require('../utils/logger')
const greatPlacesRouter = require('express').Router()
const GreatPlace = require('../models/greatPlace')

const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

greatPlacesRouter.get('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  //let decodedToken;
  //process.env.NODE_ENV !== 'test' ? decodedToken = jwt.verify(token, process.env.SECRET) : null

  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }

  const greatPlaces = await GreatPlace.find({})
  response.json(greatPlaces);
})

greatPlacesRouter.get('/:id', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const greatPlace = await GreatPlace.findById(request.params.id)
  if (greatPlace) {
    response.json(greatPlace);
  } else {
    response.status(404).end();
  }

})

greatPlacesRouter.post('/',  async (request, response) => {
  const body = request.body;
  console.log(body)
  console.log(request.swagger)
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const greatPlace = new GreatPlace({
    name: body.name,
    country: body.country,
  });

  const savedGreatPlace = await greatPlace.save();
  response.json(savedGreatPlace);
    
})

greatPlacesRouter.delete('/:id', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  await GreatPlace.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

greatPlacesRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const updatedGreatPlace = {
    name: body.name,
    country: body.country,
  }

  await GreatPlace.findByIdAndUpdate(request.params.id, updatedGreatPlace, { new: true })
  response.json(updatedGreatPlace);

})

module.exports = greatPlacesRouter;