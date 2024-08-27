const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "course name required"],
      unique: [true, "course name must be unique"],
      minlength: [4, "Too short course name"],
      maxlength: [150, "Too long course name"],
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    certificate: {
      type: Boolean,
      default: false,
    },
    introduction: {
      type: String,
      required: true,
      trim: true,
    },
    assessment: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: String,
      required: true,
      trim: true,
    },
    materials: {
      type: String,
      required: true,
      trim: true,
    },
    publishDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
); 

const courseModel = mongoose.model('courses', courseSchema);

module.exports = courseModel;