const mongoose = require("mongoose");

// mainInfo Schema
const mainInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Job Title is required."],
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cv: {
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