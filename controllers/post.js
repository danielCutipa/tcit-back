const db = require('../models')
const Post = db.posts
const Op = db.Sequelize.Op

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: 'Post name can not be empty'
    })
  }

  // Create a Post
  const post = {
    name: req.body.name,
    description: req.body.description
  }

  // Save Post in the database
  Post.create(post)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Post.'
      })
    })
}

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Post.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Post with id=' + id
      })
    })
}

// Delete a Post with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id

  const data = await Post.findByPk(id)

  Post.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        // res.send({
        //   message: 'Post was deleted successfully!'
        // })

        res.send(data)
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Post with id=' + id
      })
    })
}

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const name = req.query.name
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving posts.'
      })
    })
}
