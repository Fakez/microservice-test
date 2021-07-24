const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const GreatPlace = require('../models/greatPlace')

const api = supertest(app)

const initialPlaces = [
    {
      name: 'GPTW',
      country: 'BRA'
    },
    {
        name: 'GPTW2',
        country: 'USA'
    },
]

const placesInDb = async () => {
    const places = await GreatPlace.find({})
    return places.map(places => places.toJSON())
}

beforeEach(async () => {
    await GreatPlace.deleteMany({})
    let placeObject = new GreatPlace(initialPlaces[0])
    await placeObject.save()
    placeObject = new GreatPlace(initialPlaces[1])
    await placeObject.save()
  })

test('places are returned as json', async () => {
  await api
    .get('/api/greatplaces')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all places are returned', async () => {
    const response = await api.get('/api/greatplaces')
  
    expect(response.body).toHaveLength(initialPlaces.length)
  })

test('post works', async () => {
    const newPlace = {
        name: 'test',
        country: 'test',
    }
    await api
        .post('/api/greatplaces')
        .send(newPlace)
        .expect(200)
        .expect('Content-Type', /application\/json/)

}, 100000)


test('name or country required', async () => {
    const newPlace = {
        name: 'test',
    }
  
    await api
        .post('/api/greatplaces')
        .send(newPlace)
        .expect(400)
  
    const response = await api.get('/api/greatplaces')
  
    expect(response.body).toHaveLength(initialPlaces.length)
  })


  afterAll(() => {
    mongoose.connection.close()
  })