const express = require('express');
const Router = express.Router();
const BlogController = require('../controllers/blog');


Router.post('/', BlogController.CreateBlog)


Router.get('/', BlogController.GetAllBlogs);

// Delete Blog
// Router.delete('/', BlogController.DeleteBlog);

module.exports = Router;