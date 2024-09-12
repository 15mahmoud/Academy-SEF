const mongoose = require("mongoose");

// socialLinks Schema
const socialLinkSchema = new mongoose.Schema(
  {
  
    name: {
      type: String,
      trim: true,
      required: [true, " Name is required"],
      minlength: [3, " Name must be at least 3 characters long"],
      maxlength: [50, " Name cannot exceed 50 characters"],
    },
    link: {
      type: String,
      trim: true,
      required: [true, "link is required"],
    
    },
    icon: {
      type: String,
      default: "icon",
    },
    cv: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CV",
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// socialLinkModel 
const socialLinkModel = mongoose.model("SocialLink", socialLinkSchema);

module.exports = socialLinkModel;