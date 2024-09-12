const mongoose = require("mongoose");

// honorAndaWard Schema
const honorAndaWardSchema = new mongoose.Schema(
  {
    awardName: {
      type: String,
      trim: true,
      required: [true, "award Name is required"],
      maxlength: [50, "award Name cannot exceed 50 characters"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      max: [new Date().getFullYear(), `Year cannot be greater than the current year`],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    Issuer: {
      type: String,
      trim: true,
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

// honorAndaWard model
const honorAndaWardModel = mongoose.model("HonorAndaWard", honorAndaWardSchema);

module.exports = honorAndaWardModel;