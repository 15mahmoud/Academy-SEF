const mongoose = require("mongoose");

// hobbyAndInterest Schema
const hobbyAndInterestSchema = new mongoose.Schema(
  {
    hobbiesName: {
      type: String,
      trim: true,
      required: [true, "Hobbies Name is required"],
      maxlength: [50, "Hobbies Name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
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

// hobbyAndInterest model
const hobbyAndInterestModel = mongoose.model("HobbyAndInterest", hobbyAndInterestSchema);

module.exports = hobbyAndInterestModel;