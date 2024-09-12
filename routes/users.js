const express = require("express");
const { uploadImageMiddleware } = require("../middlewares/upload")
const verifyTokenAndAuthorization = require("../middlewares/verifyToken")
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users/userController");
const router = express.Router();

// /api/users
router.get("/", verifyTokenAndAuthorization(['admin']), getAllUsers);

// /api/users/:id
router.get("/:id", getUserById);
router.put("/:id", verifyTokenAndAuthorization(['admin']), uploadImageMiddleware, updateUser);
router.delete("/:id", verifyTokenAndAuthorization(['admin']), deleteUser);

module.exports = router;
