const { required } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
const { trim } = require('validator');
const { validate } = require('./courseModel');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "lesson title is requird"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "lesson description is required"],
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["https", "http", "ftp"],
            require_tld: true,
            require_protocol: true,
          }),
        message: "must be a valid URL",
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    unit_Id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "unit_Id is required"],
      ref: "Unit"
    },
    
  },
  { timestamps: true }
);

const lessonModel = mongoose.model('Lesson', lessonSchema);

module.exports = lessonModel;
