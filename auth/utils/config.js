require('dotenv').config()

const PORT = process.env.AUTH_PORT
const MONGODB_URI = process.env.MONGODB_URI
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS=  process.env.MAIL_PASS

module.exports = {
  MONGODB_URI,
  PORT,
  MAIL_USER,
  MAIL_PASS
}
