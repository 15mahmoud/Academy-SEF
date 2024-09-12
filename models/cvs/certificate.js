const mongoose = require("mongoose");

// certificate  Schema
const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],

      minlength: [
        3,
        " name must be at least 3 characters long",
      ],
      maxlength: [100, "name cannot exceed 100 characters"],
    },
    IssuingOrganization: {
      type: String,
      trim: true,
      required: [true, "Issuing Organization is required"],
      minlength: [3, "Issuing Organization must be at least 3 characters long"],
      maxlength: [50, "Issuing Organization cannot exceed 50 characters"],
    },
    IssueDate: {
      type: Date,
      required: [true, "Issue Date is required"],
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

// certificate model
const certificateModel = mongoose.model("Certificate", certificateSchema);

module.exports = certificateModel;
