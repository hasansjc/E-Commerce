
const { userReg, userLogin, userLogout } = require("../controllers/userController");
const express = require('express');
const router = express.Router();
router.route("/register").post(userReg);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
module.exports =router;
