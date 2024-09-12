const mongoose = require("mongoose");

// Language Schema
const languageSchema = new mongoose.Schema(
  {
    LanguageName: {
      type: String,
      trim: true,
      required: [true, "LanguageName is required."],
      minlength: [2, "LanguageName must be at least 2 characters."],
      maxlength: [50, "LanguageName cannot exceed 50 characters."],
    },
    ProficiencyLevel: {   
      type: String,
      trim: true,
      enum: ["Beginner", "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced", "Proficient", "Native Speaker"],
    },
    // cv: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "CV",
    // },
    // CreatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "CreatedBy is required."],
    // },
    // updatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "updatedBy is required."],
    // },
  },
  {
    timestamps: true,
  }
);

// Language Model
const Language = mongoose.model("Language", languageSchema);

module.exports = Language;