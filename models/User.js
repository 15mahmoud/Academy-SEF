const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phoneNumber: { type: String },

    dateOfBirth: { type: Date },
    graduationYear: { type: Number },
    about: { type: String },
    nationality: { type: String },
    country: { type: String },
    city: { type: String },
    university: { type: String },
    major: { type: String },
    status: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "instructor", "editor", "student"],
      default: "student",
    },

    profileImage: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  if (!this.profileImage) {
    const defaultImagePath = path.join("images/user", "defultprofileimage.png");
    this.profileImage = defaultImagePath;
  }
  next();
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const User = mongoose.model("User", userSchema);
module.exports = { User, hashPassword };
