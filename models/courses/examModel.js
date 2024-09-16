const { required, ref } = require('joi');
const mongoose = require('mongoose');
const path = require('path')
const validator = require('validator')

const examSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "course_Id is required"],
      ref: "courses"
    },
    level: {
      type: String,
      required: [true, "exam level is required"],
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
    }

  },
  { timestamps: true }
);



const examModel = mongoose.model('Exam', examSchema);

module.exports = examModel;