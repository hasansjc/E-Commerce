
const { userReg } = require("../controllers/userController");
const express = require('express');
const router = express.Router();
router.route("/register").post(userReg);
module.exports =router;
