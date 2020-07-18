const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    Post api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please add a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more chareaters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User Addded");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
