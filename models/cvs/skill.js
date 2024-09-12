const mongoose = require("mongoose");

// skill Schema
const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      trim: true,
      required: [true, "skill Name Name  is required"],
      minlength: [3, 'Skill Name must be at least 3 characters long'],
      maxlength: [50, 'Skill Name cannot exceed 50 characters'],
    },
    subSkill: {
      type: String,
      trim: true,
      maxlength: [50, 'Sub Skill cannot exceed 50 characters'],
      
    },
    skillLevel: {
      type: String,
      trim: true,
      maxlength: [20, 'Skill Level cannot exceed 20 characters'],
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

// link model
const skillModel = mongoose.model("Skill", skillSchema);

module.exports = skillModel;
