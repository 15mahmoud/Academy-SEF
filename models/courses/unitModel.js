const { required } = require("joi");
const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: [true, "unit name is required"],
      trim: true,
    },
    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "course_Id is required"],
      ref: "courses",
    },
    lessons: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  },
  { timestamps: true }
);

const unitModel = mongoose.model('Unit', unitSchema);

module.exports = unitModel;