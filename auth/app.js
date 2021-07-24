const express = require('express')
const app = express()

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
require('express-async-errors')

const cors = require('cors')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = require('./docs/swaggerOptions')

const authRouter = require('./controllers/auth')

const mongoose = require('mongoose')

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

app.use('/api/auth', authRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


/**
 * @swagger
 * /api/auth:
 *  post:
 *      tags:
 *          - 2FA Authentication
 *      name: Authenticate
 *      produces:
 *          - application/json
 *      consumes:
 *          - application/json
 *      summary: Authenticates a user by sending a token via e-mail
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