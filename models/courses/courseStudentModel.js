const { required } = require('joi');
const mongoose = require('mongoose');
const { trim } = require('validator');
const courseStudentSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "user_Id is required"],
      ref: "User",
    },

    course_Id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "course_Id is required"],
      ref: "Course",
    },
    progress: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);
const courseStudentModel = mongoose.model('CourseStudent', courseStudentSchema);

module.exports = courseStudentModel;