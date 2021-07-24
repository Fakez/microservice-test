const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/user')
const {sendMail} = require('../services/emailSender')


authRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ email: body.email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!user) return response.status(401).json({error: 'invalid email or does not exist'})
  if (!passwordCorrect) return response.status(401).json({error: 'invalid password'})
  
  const userForToken = {
    user: user.user,
    id: user._id,
  }

  const expirationTime = 60*60;
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: expirationTime })

  response.status(200).send(`Sent token to user email: ${user.email}.`)
  sendMail(user.email, token, expirationTime);
})

module.exports = authRouter;