const { required } = require('joi');
const mongoose = require('mongoose');
const path = require("path");
const validator = require("validator");

function arrayLimit(val) {
  return val.length >= 2;
}
const questionSchema = new mongoose.Schema(
  {
    exam_Id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "exam_Id is required"],
      ref: "Exam",
    },
    question_type: {
      type: String,
      required: [true, "question_type is required"],
    },
    question: {
      type: String,
      required: [true, "question is required"],
    },
    mark: {
      type: Number,
      validate: function (val) {
        return val >= 0;
      },
    },
    images: {
      type: String,
      trim: true,
      default: path.join(`${__dirname}`, `../images/course/images.jpeg`),
    },
    options: {
      type: [String],
      required: true,
      validate: [arrayLimit, "the number of answers more than or equal 2"],
    },
    answer: {
      type: String,
      required: [true, "you must choose one answer"],
    },
  },
  { timestamps: true }
);

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;