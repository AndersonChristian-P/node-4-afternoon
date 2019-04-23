require("dotenv").config()
const express = require("express")
const session = require("express-session")

const swagCtrl = require("./controllers/swagController")
const authCtrl = require("./controllers/authController")

const app = express()

let { SESSION_SECRET, SESSION_PORT } = process.env
let checkForSession = require("./middlewares/checkForSession")

// --Middleware-- //
app.use(express.json())
// makes the body of the req available

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// the object in session is a configuration object

app.use(checkForSession)

// --Endpoints-- //
app.get("/api/swag", swagCtrl.read)

app.post("/api/login", authCtrl.login)
app.post("/api/register", authCtrl.register)
app.post("/api/signout", authCtrl.signOut)
app.get("/api/user", authCtrl.getUser)


app.listen(SESSION_PORT, () => {
  console.log(`listening on port ${SESSION_PORT}`)
})