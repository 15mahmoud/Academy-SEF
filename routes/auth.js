const express = require("express");
const verifyTokenAndAuthorization = require("../middlewares/verifyToken")
const {
    register,
    registerByAdmin,
    generateUserId,
    login } = require("../controllers/users/authController");
const router = express.Router();

// /api/auth/registerbyadmin
router.post("/register", register);

// /api/auth/registerbyadmin
router.post("/registerbyadmin", verifyTokenAndAuthorization(['admin']), registerByAdmin);

// /api/auth/generateuserid
router.get("/generateuserid", verifyTokenAndAuthorization(['admin']), generateUserId);

// /api/auth/login
router.post("/login", login);

module.exports = router;
