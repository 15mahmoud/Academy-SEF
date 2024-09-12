const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateUserId = require("../../utils/userIdGenerator")
const { User, hashPassword } = require("../../models/users/User");

const {
  validateRegisterUser,
  validateRegisterUserByAdmin,
  validateLoginUser,
} = require("../../validation/userValidator");

/**
 *  @desc    Register New User
 *  @route   /api/auth/register
 *  @method  POST
 *  @access  public
 */
module.exports.register = asyncHandler(async (req, res) => {

  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "this email already registered",
    });
  }

  req.body.password = await hashPassword(req.body.password);

  const userId = await generateUserId();

  user = new User({ userId, ...req.body });

  const result = await user.save();
  const token = user.generateToken();

  const { password, ...other } = result._doc;

  res.status(201).json({
    success: true,
    data: { ...other, token },
  });
});
/**
 *  @desc    Register New User by admin
 *  @route   /api/auth/registerbyadmin
 *  @method  POST
 *  @access  private
 */
module.exports.registerByAdmin = asyncHandler(async (req, res) => {

  const { email, userId } = req.body;

  const { error } = validateRegisterUserByAdmin(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({
    $or: [{ email }, { userId }]
  });

  if (user) {
    const message = user.email === email
      ? "This email is already registered."
      : "This userId is already registered.";

    return res.status(400).json({
      success: false,
      message,
    });
  }

  req.body.password = await hashPassword(req.body.password);

  user = new User(req.body);

  const result = await user.save();

  const { password, ...other } = result._doc;

  res.status(201).json({
    success: true,
    data: { ...other },
  });
});

/**
 *  @desc    generate user id
 *  @route   /api/auth/generateuserid
 *  @method  GET
 *  @access  private
 */
module.exports.generateUserId = asyncHandler(async (req, res) => {

  const userId = await generateUserId();

  res.status(201).json({
    success: true,
    data: userId,
  });
});

/**
 *  @desc    Login User
 *  @route   /api/auth/login
 *  @method  POST
 *  @access  public
 */
module.exports.login = asyncHandler(async (req, res) => {

  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({ userId: req.body.userId });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "invalid id or password",
    });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "invalid id or password",
    });
  }
  const token = user.generateToken();

  const { password, ...other } = user._doc;

  res.status(200).json({
    success: true,
    data: { ...other, token },
  });
});
