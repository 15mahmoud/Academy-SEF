const mongoose = require("mongoose");

// mainInfo Schema
const mainInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, " first Name is required"],
      minlength: [3, "first Name must be at least 3 characters long"],
      maxlength: [50, "first Name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "last Name is required"],
      minlength: [3, " last Name must be at least 3 characters long"],
      maxlength: [50, "last Name cannot exceed 50 characters"],
    },
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Job Title is required."],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function(value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format. Please provide a valid email address.",
      },
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "profileImage",
    },
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
    cv_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CV",
    },
  },
  {
    timestamps: true,
  }
);

// mainInfo model
const MainInfo = mongoose.model("MainInfo", mainInfoSchema);

module.exports = MainInfo;