const BlogsModel = require('../models/blog');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const GetAllBlogs = async (req, res) => {

    try {
        const blogs = await BlogsModel.find();
        return res.status(200).json({
            message: 'Succesfully found the blogs!',
            data: blogs
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching blogs!',
            error
        })
    }
}

const CreateBlog = async (req, res) => {
    const allHeaders = req.headers;

    if (!allHeaders.authorization) {
        return res.status(401).json({
            message: "Please provide the token"
        })
    }
    const token = allHeaders.authorization;


    const decodedToken = jwt.decode(token, { complete: true});
    
    const userId = decodedToken.payload.id;

    const userExists = await UserModel.findById(userId);

    if (!userExists) {
        return res.status(401).json({
            message: 'You are not authorized to create a blog!'
        })
    }

    const blogBody = req.body;

    const newBlog = new BlogsModel({
        user: userId,
        title: blogBody.title,
        description: blogBody.description,
        image: blogBody.image
    })

    const savedBlog = await newBlog.save();

    return res.status(201).json({
        message: "Blog Created Succesfully!",
        data: savedBlog
    })
    

}

module.exports = {
    GetAllBlogs,
    CreateBlog
}