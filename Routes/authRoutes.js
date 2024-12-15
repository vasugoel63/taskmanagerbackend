const express = require("express");
const authController = require("../Controllers/AuthController");
const router = express.Router();

const {login, signup} = authController;
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;