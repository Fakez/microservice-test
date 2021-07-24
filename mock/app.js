const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = require('./docs/swaggerOptions')

const logger = require('./utils/logger')
const config = require('./utils/config')
const greatPlacesRouter = require('./controllers/greatPlaces')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use('/api/greatplaces', greatPlacesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

/**
 * @swagger
 * /api/greatplaces:
 *   get:
 *     tags:
 *      - Places
 *     summary: Get all places
 *     description: Get all places
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Invalid token or no token found
 *       400:
 *         description: Error
 */

/** 
 * @swagger
 * /api/greatplaces/{id}:
 *   get:
 *     tags:
 *      - Places
 *     summary: Get a place by id
 *     description: Gets a place
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Invalid token or no token found
 *       400:
 *         description: Error
 */


/**
 * @swagger
 * /api/greatplaces:
 *  post:
 *      tags:
 *          - Places
 *      name: Create
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      summary: Create a new place
 *      requestBody:
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     name:
 *                        type: string
 *                     country:
 *                        type: string
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *               description: Invalid token or no token found
 */

/**
 * @swagger
 * /api/greatplaces/{id}:
 *  put:
 *      tags:
 *          - Places
 *      name: Update
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      summary: Update a place
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id of the workplace
 *        required: true
 *        type: string
 *      requestBody:
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     name:
 *                        type: string
 *                     country:
 *                        type: string
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *               description: Invalid token or no token found
 */


/** 
 * @swagger
 * /api/greatplaces/{id}:
 *   delete:
 *     tags:
 *      - Places
 *     summary: Delete a place by id
 *     description: Deletes a place by id
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id
 *        required: true
 *     responses:
 *       204:
 *         description: Deleted
 *       401:
 *         description: Invalid token or no token found
 *       400:
 *         description: Error
 */


/**
 * @swagger
 * /api/users/register:
 *  post:
 *      tags:
 *          - Users
 *      name: Create user
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      summary: Create a new user
 *      requestBody:
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 *                     password:
 *                        type: string
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Invalid email or does not exist
 *          400:
 *               description: Error
 */

module.exports = app