const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const path = require("path")
const fs = require("fs")
const { validateUpdateUser } = require("../validation/userValidator");
const { convertToFullPath } = require("../utils/relativeToFullPath")
const { deleteUploadedFile } = require("../utils/deleteFile")

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
      return res.status(404).json({ message: "There are no users" });
    }

    const usersWithFullPaths = users.map(user => {
      if (user.profileImage) {
        user.profileImage = convertToFullPath(req, user.profileImage);
      }
      return user;
    });

    return res.status(200).json({
      success: true,
      data: usersWithFullPaths,
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
 *  @desc    get Users by role
 *  @route   /api/users/role/:role
 *  @method  GET
 *  @access  private only admin
 */
exports.getUsersByRole = async (req, res) => {

  const role = req.params.role.toLowerCase();

  const roles = User.schema.paths.role.enumValues;

  if (!roles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role parameter"
    });
  }

  try {
    const users = await User.find({ role: role }).select("-password");

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for the given role"
      });
    }

    const usersWithFullPaths = users.map(user => {
      if (user.profileImage) {
        user.profileImage = convertToFullPath(req, user.profileImage);
      }
      return user;
    });

    res.status(200).json({
      success: true,
      users: usersWithFullPaths
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
exports.getUserById = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "There is no user with this ID" });
  }

  if (user.profileImage) {
    user.profileImage = convertToFullPath(req, user.profileImage);
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
})

/**
 *  @desc    update User
 *  @route   /api/users/:id
 *  @method  PUT
 *  @access  private only admin and user him self
 */
exports.updateUser = asyncHandler(async (req, res) => {

  const { error } = validateUpdateUser(req.body);
  if (error) {
    if (req.file) {
      deleteUploadedFile(req.file.filename);
    }
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    if (req.file) {
      deleteUploadedFile(req.file.filename);
    }
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (req.body.email && req.body.email !== user.email) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      if (req.file) {
        deleteUploadedFile(`/public/images/user/${req.file.filename}`);
      }

      return res.status(400).json({ message: "This email is already in use" });
    }
  }

  if (req.file) {
    if (user.profileImage && !user.profileImage.includes("defultprofileimage.png")) {
      const oldImagePath = `/public/images/user/${path.basename(user.profileImage)}`;
      deleteUploadedFile(oldImagePath);
    }

    req.body.profileImage = `/images/user/${req.file.filename}`;
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


  updatedUser.profileImage = convertToFullPath(req, updatedUser.profileImage)

  return res.status(200).json({
    success: true,
    updatedUser,
  });

});

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
