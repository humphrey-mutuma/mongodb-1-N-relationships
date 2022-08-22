const express = require("express");
const router = express.Router();
const {
  getPeople,
  // getPerson,
  createPerson,
  // updatePerson,
  // deletePerson,
} = require("../controllers/peopleController");

// get and create Persons (they're in the same route)
router.route("/").get(getPeople).post(createPerson);
// router.route("/:id").get(getPerson).put(updatePerson).delete(deletePerson);

module.exports = router;
