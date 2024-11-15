const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser);



module.exports = router;