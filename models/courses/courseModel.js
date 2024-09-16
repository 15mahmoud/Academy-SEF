const mongoose = require('mongoose');
const path = require('path');
const courseSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["enroll", "completed"],
      default: "student",
    },
    title: {
      type: String,
      required: [true, "course name required"],
      unique: [true, "course name must be unique"],
      minlength: [4, "Too short course name"],
      maxlength: [150, "Too long course name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    instructor: {
      type: String,
      required: [true, "instructor is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "course description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "course price is required"],
      trim: true,
    },
    level: {
      type: Number,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
    startDate: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    certificate: {
      type: Boolean,
      default: false,
    },
    introduction: {
      type: String,
      trim: true,
    },
    assessment: {
      type: String,
      trim: true,
    },
    requirements: {
      type: String,
      trim: true,
    },
    materials: {
      type: String,
      trim: true,
    },
    publishDate: {
      type: String,
      trim: true,
    },
    coverPhoto: {
      type: String,
      default: path.join(
        `${__dirname}`,
        `../images/course/stock-vector-human-hand-touching-on-a-book-low-poly-wireframe-online-education-blue-b.jpg`
      ),
    },
    units: {
      type: mongoose.Schema.ObjectId,
      ref: "Unit",
    },
    review: {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },

  },
  { timestamps: true }
);

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;