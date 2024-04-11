const express = require('express');

const app = express();

const PORT = 3000;

const mongoose = require('mongoose');

const userModel = require('./models/users');

require('dotenv').config();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected');
}).catch((error) => {
    console.log(`Error ${error}`);
});


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get("/users", (req, res) => {
    userModel.find()
      .then((users) => {
        return res.status(200).json({
          message: "Users fetched successfully",
          users,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error fetching users",
          error,
        });
      });
  });
  
  app.post("/users", (req, res) => {
    const userBody = req.body;
    const newUser = new userModel({
      name: userBody.name,
      email: userBody.email,
      password: userBody.password,
      contact: userBody.contact,
      department: userBody.department,
    });
  
    newUser
      .save()
      .then((user) => {
        return res.status(201).json({
          message: "User created successfully",
          user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error creating user",
          error,
        });
      });
  });


  
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
  
    userModel.findById(userId)
      .then((user) => {
        return res.status(200).json({
          message: "User fetched successfully",
          user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error fetching user",
          error,
        });
      });
  });
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})