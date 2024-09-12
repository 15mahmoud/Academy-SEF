const mongoose = require("mongoose");

// connction Schema
const connctionchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      trim: true,
      required: [true, "Website Name is required"],
      minlength: [3, "Website Name must be at least 3 characters long"],
      maxlength: [50, "Website Name cannot exceed 50 characters"],
    },
    phoneNumer: {
      type: String,
      trim: true,
    },
    landlinePhone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    // cv: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "CV",
    // },
    // CreatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // updatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

// connction model
const connctionModel = mongoose.model("Connction", connctionchema);

module.exports = connctionModel;
