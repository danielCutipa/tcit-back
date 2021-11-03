module.exports = (app) => {
  const posts = require('../controllers/post.js')

  let router = require('express').Router()

  // Create a new Post
  router.post('/', posts.create)

  // Retrieve all Posts
  router.get('/', posts.findAll)

  // Delete a Post with postId
  router.delete('/:id', posts.delete)

  app.use('/api/posts', router)
}
