const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.checkIfUserExists = async (authId) => {
  try {
    const existingUser = await User.findOne({ authId });
    return existingUser;
  } catch (error) {
    throw error;
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, authId, inviteCode } = req.body;
    let hashedPassword;

    if (!username || !email) {
      return res.json({ status: false, message: "Incomplete Details!" });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ status: false, message: "Email already in used" });
    }

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.create({
      email,
      username,
      password: password ? hashedPassword : "",
      authId: authId ? authId : "",
      inviteCode: inviteCode ? inviteCode : "",
    });

    return res.json({ status: true, message: "Registeration Successfull!" });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let isPasswordValid;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "Incorrect credentials!",
      });
    }

    if (password) {
      isPasswordValid = bcrypt.compare(password, user.password);
    }

    if (password && !isPasswordValid) {
      return res.json({
        message: "Incorrect password",
        status: false,
      });
    }

    return res.json({
      status: true,
      message: "Login Successfull",
      userId: user._id,
      token: `Bearer ${generateToken(user._id.toString())}`,
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};
