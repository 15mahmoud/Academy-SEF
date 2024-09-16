const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    course_Id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "course_Id is required"],
      ref: "courses",
    },
    user_Id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
