require("dotenv").config()
const express = require("express")
const session = require("express-session")

const swagCtrl = require("./controllers/swagController")

const app = express()

let { SESSION_SECRET, SESSION_PORT } = process.env
let checkForSession = require("./middlewares/checkForSession")

app.use(express.json())
// makes the body of the req available

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// the object in session is a configuration object

app.use(checkForSession)

app.get("/api/swag", swagCtrl.read)


app.listen(SESSION_PORT, () => {
  console.log(`listening on port ${SESSION_PORT}`)
})