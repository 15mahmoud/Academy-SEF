const { required, ref } = require('joi');
const mongoose = require('mongoose');
const path = require('path')
const validator = require('validator')

const examSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, "exam level is required"],
    },

    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "course_Id is required"],
      ref: "courses",
    },
    full_mark: {
      type: Number,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);



const examModel = mongoose.model('Exam', examSchema);

module.exports = examModel;