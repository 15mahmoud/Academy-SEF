const { required } = require('joi');
const mongoose = require('mongoose');
const { trim } = require('validator');
const path = require('path');

const certificateSchema = new mongoose.Schema(
  {
    student_Id: {
      type: mongoose.Schema.ObjectId,
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
      default: () => new Date().toISOString() 
    },
    certificateImage: {
      type: String,
      default: "http://localhost:3000/images/certificates/certificate.png"
    },

  },

  { timestamps: true }
);
const certificateModel = mongoose.model('Certificate', certificateSchema);
module.exports = certificateModel;