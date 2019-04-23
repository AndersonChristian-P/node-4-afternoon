let users = require("./../models/users")

let id = 1

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body

    const user = users.find(user => user.username === username && user.password === password)
    // checks to see if the username & password in the req.body matches an object in the users array

    if (user) {
      req.session.user.username = user.username
      res.status(200).send(req.session.user)
    } else {
      res.status(500).send("Unauthorized.")
    }
    // per the instructions we are to set the req.session username equal to the user.username

  },


  register: (req, res) => {
    const { username, password } = req.body
    let newUser = {
      username,
      password
    }
    newUser.id = id++
    users.push(newUser)
    req.session.user.username = username
    res.status(200).send(req.session.user)
  },

  signOut: (req, res) => {
    req.session.destroy()
    res.status(200).send(req.session)
  },

  getUser: (req, res) => {
    res.status(200).send(req.session.user)
  }

}


