const mongoose = require("mongoose");

// cv Schema
const cvSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      required: [true, "code is required"],
      minlength: [3, "code must be at least 3 characters long"],
      maxlength: [50, "code cannot exceed 50 characters"],
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [1024, "Summary cannot exceed 1024 characters"],
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
  },
  {
    timestamps: true,
  }
);

// cv model
const cvModel = mongoose.model("Cv", cvSchema);

module.exports = cvModel;