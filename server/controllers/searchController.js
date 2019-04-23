let swag = require("./../models/swag")

module.exports = {
  search: (req, res) => {
    const { category } = req.query

    if (!category) {
      res.status(200).send(swag)
    } else {
      let swagArr = swag.filter(val => val.category === category)
      res.status(200).send(swagArr)
    }
  }
}
