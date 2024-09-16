const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 

// Application Schema
const ApplicationSchema = new Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, 'Job Is Required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId Is Required'],
    },
    offer: {
      type: String,
      minlength: 50,
      maxlength: 500,
      required: [true, 'application Offer Is Required'],
    },
    status: {
      type: Number,
      enum: [1,2,3,4,5],
      default: 1
    }
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;

