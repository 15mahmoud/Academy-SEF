const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company Name is required"],
      trim: true,
      minlength: [2, "Company Name must be at least 2 characters long"],
      maxlength: [100, "Company Name cannot exceed 100 characters"],
    },
    companyLogo: {
      type: String, // URL or file path to the logo
      required: false,
      trim: true,
    },
    field: {
      type: String,
      required: [true, "Field is required"],
      trim: true,
      minlength: [2, "Field must be at least 2 characters long"],
      maxlength: [100, "Field cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [2, "Location must be at least 2 characters long"],
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    aboutCompany: {
      type: String,
      required: false,
      trim: true,
      maxlength: [2000, "About The Company cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

const Company = mongoose.model("Company", companySchema);

const jobSchema = new Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minlength: [2, "Position must be at least 2 characters long"],
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    jobType: {
      type: String,
      enum: ["Remote", "On site"],
      default: "On site",
    },
    salaryRange: {
      from: {
        type: Number,
        required: [true, "Salary Range start is required"],
        min: [0, "Salary must be a positive number"],
      },
      to: {
        type: Number,
        required: [true, "Salary Range end is required"],
        min: [0, "Salary must be a positive number"],
      },
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP", "INR", "JPY", "Other"], // Add other currencies as needed
    },
    jobDescription: {
      type: String,
      required: [true, "Job Description is required"],
      trim: true,
      maxlength: [5000, "Job Description cannot exceed 5000 characters"],
    },
    jobRequirements: {
      type: String,
      required: [true, "Job Requirements are required"],
      trim: true,
      maxlength: [5000, "Job Requirements cannot exceed 5000 characters"],
    },
    skills: {
      type: [String], // Array of skills
      required: [true, "At least one skill is required"],
      validate: [arrayLimit, "Skills must be at least one item"],
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JopApplication",
      },
    ],
    publishDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    createdBy: {
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
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Custom validator for skills array
function arrayLimit(val) {
  return val.length > 0;
}

const JobAlter = mongoose.model("JobAlter", jobSchema);

// module.exports = {JobAlter,Company};
