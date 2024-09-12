const mongoose = require("mongoose");

// template Schema
const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: [10, "Name must be at least 10 characters."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },
    url: {
      type: String,
      required: [true, "url is required."],
    
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "inActive",
    },
    cv: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CV",
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
  },
  {
    timestamps: true,
  }
);

// template model
const Template = mongoose.model("Template", templateSchema);

module.exports = Template;