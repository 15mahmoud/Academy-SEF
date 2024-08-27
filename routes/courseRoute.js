const express = require('express');
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.route("/")
    .post(createCourse)
    .get(getCourses);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);


module.exports = router;