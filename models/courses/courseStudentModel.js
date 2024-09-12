const { required } = require('joi');
const mongoose = require('mongoose');
const { trim } = require('validator');
const courseStudentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "studentId is required"],
      ref: "User", 
      unique: true, 
    },

    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "course_Id is required"],
      ref: "courses",
    },
    progress: {
      type: String,
    },
  },
  { timestamps: true }
);
const courseStudentModel = mongoose.model('CourseStudent', courseStudentSchema);

module.exports = courseStudentModel;