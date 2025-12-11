const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role, department } = req.body;

    // Check existing email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Create user with role + department
    const user = new User({
      name,
      email,
      phone,
      password,
      role: role || "user",       // default user
      department: role === "department" ? department : null
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      },
      token: generateToken(user)
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: generateToken(user)
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
