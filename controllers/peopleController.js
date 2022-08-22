const asyncHandler = require("express-async-handler");
const Person = require("../models/peopleModel");
// const Story = require("../models/storyModel");
const mongoose = require("mongoose");

// get them people
const getPeople = asyncHandler(async (req, res) => {
  Person.findOne({
    _id: "630366d27bf4563239792973",
  })
    .populate("stories")
    .exec(function (err, story) {
      if (err) return handleError(err);
      console.log("The author is %s", story);
      res.status(200).json({ story });
      // prints "The author is Ian Fleming"
    });
});
// get a single Person
// const getPerson = asyncHandler(async (req, res) => {
//   // const author = await Person.findOne({ _id: "6303581ada75ea3cd4106bd5" });
//   // console.log("story author: ", author);
//   res.status(200).json({ haloooo });
// });

// create a todo
const createPerson = asyncHandler(async (req, res) => {
  const newperson = await Person.create({
    _id: new mongoose.Types.ObjectId(),
    name: "Jane Doe",
    age: 40,
    stories: ["630387c9a36346b853e51128"],
  });
  res.json({ newperson });
});

// // update a todo
// const updatePerson = asyncHandler(async (req, res) => {
//   // check if the todo exists in the database
//   const todo = await Todo.findById(req.params.id);
//   if (!todo) {
//     res.status(404);
//     throw new Error("Todo does not exist");
//   }
//   // update
//   const newName = req.body;

//   if (!newName) {
//     res.status(400);
//     throw new Error("Please add a todo name");
//   }
//   const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, newName, {
//     new: true,
//   });

//   if (updatedTodo) {
//     res.status(200).json(updatedTodo);
//   }
// });

// // delete a todo
// const deletePerson = asyncHandler(async (req, res) => {
//   const todo = await Todo.findById(req.params.id);
//   if (!todo) {
//     res.status(400);
//     throw new Error("Please add a todo ID");
//   }
//   // delete the specific todo
//   const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
//   if (deletedTodo) {
//     res.status(200).json({ message: `${todo.name} deleted` });
//   }
// });

module.exports = {
  getPeople,
  // getPerson,
  createPerson,
  // updatePerson,
  // deletePerson,
};
