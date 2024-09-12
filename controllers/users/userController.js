const { User } = require("../../models/users/User");
const path = require("path")
const fs = require("fs")
const { validateUpdateUser } = require("../../validation/userValidator");

/**
 *  @desc    get all Users
 *  @route   /api/users
 *  @method  GET
 *  @access  private only admin
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "there are no users" });
    }
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 *  @desc    get user by id
 *  @route   /api/users/:id
 *  @method  GET
 *  @access  public 
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "there are no user with this id" });
    } else {
      return res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 *  @desc    update User
 *  @route   /api/users/:id
 *  @method  PUT
 *  @access  private only admin and user him self
 */
exports.updateUser = async (req, res) => {
  try {

    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "This email is already in use" });
      }
    }

    if (req.file) {
      if (user.profileImage && !user.profileImage.includes("defultprofileimage.png")) {

        const oldImagePath = path.join(`${__dirname}`, `../images/user`, path.basename(user.profileImage));
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log("Failed to delete old image:", err.message);
        });
      }

      req.body.profileImage = path.join(`${__dirname}`, `../images/user/${req.file.filename}`);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};

/**
 *  @desc    delete User
 *  @route   /api/users/:id
 *  @method  DELETE
 *  @access  private only admin and user him self
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    // Delete the user's profile image if it exists and it's not the default image
    if (user.profileImage && !user.profileImage.includes("defultprofileimage.png")) {
      const imagePath = path.join(`${__dirname}`, `../images/user`, path.basename(user.profileImage));
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Failed to delete user image:", err.message);
      });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
