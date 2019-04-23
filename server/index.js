require("dotenv").config()
const express = require("express")
const session = require("express-session")

const swagCtrl = require("./controllers/swagController")
const authCtrl = require("./controllers/authController")
const cartCtrl = require("./controllers/cartController")
const searchCtrl = require("./controllers/searchController")

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

app.use(express.static(`${__dirname}/../build`))

// --Endpoints-- //

///// Swag
app.get("/api/swag", swagCtrl.read)

///// Auth
app.post("/api/login", authCtrl.login)
app.post("/api/register", authCtrl.register)
app.post("/api/signout", authCtrl.signOut)
app.get("/api/user", authCtrl.getUser)

///// Cart
app.post("/api/cart/checkout", cartCtrl.checkout)
app.post("/api/cart/:id", cartCtrl.add)
app.delete("/api/cart/:id", cartCtrl.delete)

///// Swag Filter
app.get("/api/search", searchCtrl.search)

app.listen(SESSION_PORT, () => {
  console.log(`listening on port ${SESSION_PORT}`)
})