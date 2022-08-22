const asyncHandler = require("express-async-handler");
const Story = require("../models/storyModel");
const Person = require("../models/peopleModel");
const mongoose = require("mongoose");

// get them todos
const getStories = asyncHandler(async (req, res) => {
  Story.findOne({
    _id: "63036b2f40f57d7503f19d9b",
  })
    .populate("author")
    .exec(function (err, story) {
      if (err) return handleError(err);
      console.log("The author is %s", story);
      res.status(200).json({ story });
    });
});

// get a single todo
// const getStory = asyncHandler(async (req, res) => {
//   const story = await Story.findById(req.params.id);
//   res.status(200).json(story);
// });

// create a newStoy
const createStory = asyncHandler(async (req, res) => {
  Story.create(
    {
      title: "Hapa Ni God Manze !!",
      author: "630366d27bf4563239792973", // assign the _id from the person
    },
    function (err, story) {
      if (err) {
        console.log("error creating story", err);
        return;
      }

      // update the Person Model by pushing the object ID of the newly created story into the array of
      // object ids ref in the Person Model
      Person.findOneAndUpdate(
        { _id: story.author },
        { $push: { stories: story._id } },
        { upsert: true, new: true, runValidators: true },
        (err, doc) => {
          if (err) {
            console.log("Person Id not pushes", err);
          }

          console.log("doc id pushed to the person", doc);
        }
      );
      console.log("Hope this works", story._id);
      res.json({ story });
    }
  );

});

// // update a todo
// const updateStory = asyncHandler(async (req, res) => {
//   // check if the todo exists in the database
//   const story = await Story.findById(req.params.id);
//   if (!story) {
//     res.status(404);
//     throw new Error("Story does not exist");
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
// const deleteStory = asyncHandler(async (req, res) => {
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
  getStories,
  // getStory,
  createStory,
  // updateStory,
  // deleteStory,
};
