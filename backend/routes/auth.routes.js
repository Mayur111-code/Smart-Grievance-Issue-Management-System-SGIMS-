const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const { register, login, } = require("../controllers/auth.controller");

const { getProfile, updateProfile } = require("../controllers/profile.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);

module.exports = router;
