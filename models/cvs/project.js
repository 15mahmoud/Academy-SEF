const mongoose = require("mongoose");

// project Schema
const projectSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      trim: true,
      required: [true, "Project Name is required."],
      minlength: [5, "Project Name must be at least 5 characters."],
      maxlength: [100, "Project Name cannot exceed 100 characters."],
    },
    Description: {
      type: String,
      trim: true,
      required: [true, "Description is required."],
      minlength: [10, "Description must be at least 10 characters."],
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function(value) {
          return this.endDate ? value < this.endDate : true;
        },
        message: "Start date must be before the end date.",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function(value) {
          return this.startDate ? value > this.startDate : true;
        },
        message: "End date must be after the start date.",
      },
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

// project model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;