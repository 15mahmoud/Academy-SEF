const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is required"],
    },
    Title: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minlength: [2, "Position must be at least 2 characters long"],
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    Type: {
      type: String,
      enum: ["Remote", "On site"],
      default: "On site",
    },
    salaryRange: {
      from: {
        type: Number,
        min: [0, "Salary must be a positive number"],
      },
      to: {
        type: Number,
        min: [0, "Salary must be a positive number"],
      },
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["EGP", "USD", "EUR", "GBP", "INR", "JPY", "SAR"], // Add other currencies as needed
      default: "EGP"
    },
    brief: {
      type: String,
      required: [true, "Job Description is required"],
      trim: true,
      maxlength: [5000, "Job Description cannot exceed 5000 characters"],
    },
    Requirements: {
      type: String,
      required: [true, "Job Requirements are required"],
      maxlength: [5000, "Job Requirements cannot exceed 5000 characters"],
    },
    skills: {
      type: [String], // Array of skills
      required: [true, "At least one skill is required"],
      validate: [arrayLimit, "Skills must be at least one item"],
    },
    publishDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    // updatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Custom validator for skills array
function arrayLimit(val) {
  return val.length > 0;
}

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
