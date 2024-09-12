const mongoose = require("mongoose");

// education Schema
const educationSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      trim: true,
      required: [true, "Organization Name is required"],
      maxlength: [100, "Organization Name cannot exceed 100 characters"],
    }, 
    university: {
      type: String,
      trim: true,
      required: [true, "university  is required"],
      maxlength: [100, "university  cannot exceed 100 characters"],
    }, 
    degree: {
      type: String,
      required: [true, "Degree is required"],
      maxlength: [50, "Degree cannot exceed 50 characters"],
    },
    timePeriod: {
      from: {
        type: Date,
        required: [true, "From date is required"],
      },
      to: {
        type: Date,
        required: [true, "To date is required"],
      },
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    // cv: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "CV",
    // },
    // CreatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // updatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

// education model
const educationModel = mongoose.model("Education", educationSchema);

module.exports = educationModel;