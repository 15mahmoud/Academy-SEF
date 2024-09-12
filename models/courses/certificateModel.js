const { required } = require('joi');
const mongoose = require('mongoose');
const { trim } = require('validator');
const path = require('path');

const certificateSchema = new mongoose.Schema(
  {
    student_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "student_Id is required"],
      ref: "CourseStudent",
    },
    dateAcquired: {
      type: String,
      trim: true,
    },
    uploadDate: {
      type: String,
      trim: true,
    },
    certificateImage: {
      type: String,
      default: path.join(
        `${__dirname}`,
        `../images/course/d9e0d1deaff41b83a68244e2580669cb.jpg`
      ),
    },
  },

  { timestamps: true }
);
const certificateModel = mongoose.model('Certificatecourse', certificateSchema);
module.exports = certificateModel;