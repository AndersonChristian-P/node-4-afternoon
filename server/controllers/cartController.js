let swag = require("./../models/swag")

module.exports = {

  add: (req, res) => {
    const { id } = req.params
    const { user } = req.session

    const index = user.cart.findIndex(swag => +swag.id === +id)
    // returns -1 if item isn't in the cart

    if (index === -1) {
      const itemToAdd = swag.find(swag => +swag.id === +id)
      user.cart.push(itemToAdd)
      user.total += itemToAdd.price
      res.status(200).send(user)
    }

    res.status(200).send(user)
  },

  delete: (req, res) => {
    const { id } = req.params
    const { user } = req.session

    const index = user.cart.findIndex(swag => +swag.id === +id)
    const itemToRemove = swag.find(swag => +swag.id === +id)

    if (index !== -1) {
      user.cart.splice(index, 1)
      user.total -= itemToRemove.price
    }

    res.status(200).send(user)
  },

  checkout: (req, res) => {
    const { user } = req.session
    user.cart = []
    user.total = 0
    res.status(200).send(user)
  }
}