const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 

// Application Schema
const ApplicationSchema = new Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },
    cv: {
      type: String,
    required: true,
    trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const JopApplication = mongoose.model("JopApplication", ApplicationSchema);

module.exports = JopApplication;

