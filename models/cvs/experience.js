const mongoose = require("mongoose");

// experience Schema
const experienceSchema = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
      trim: true,
      required: [true, 'Company Name is required'],
      minlength: [3, 'Company Name must be at least 3 characters long'],
      maxlength: [50, 'Company Name cannot exceed 50 characters'],
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9\s]*$/.test(v);
        },
        message: props => `${props.value} contains special characters, only alphanumeric characters and spaces are allowed.`
      }
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      minlength: [3, 'Position must be at least 3 characters long'],
      maxlength: [50, 'Position cannot exceed 50 characters'],
    },
    timePeriod: {
      from: {
        type: Date,
        required: [true, 'Start date is required'],
      },
      to: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
          validator: function(v) {
            return this.timePeriod.from < v;
          },
          message: 'End date must be after the start date'
        }
      }
    }, 
    CompanyLogo: {
      type: String,
      default: "logo",
    },
    // project: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    // },
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

// experience model
const experienceModel = mongoose.model("Experience", experienceSchema);

module.exports = experienceModel;