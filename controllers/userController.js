const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const { generateToken } = require("../utils/generateToken");
const celebrityModel = require("../models/celebrityModel");

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
    const { username, email, password, inviteCode } = req.body;
    let hashedPassword;

    if (!username || !email) {
      return res.json({ status: false, message: "Incomplete Details!" });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ status: false, message: "Email already in use" });
    }

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.create({
      email,
      username,
      password: password ? hashedPassword : "",
      inviteCode: inviteCode ? inviteCode : "",
    });

    return res.json({ status: true, message: "Registeration Successfull" });
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
        message: "User with this email doesn't exist ",
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

module.exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, gender, dob, phoneNumber, email } = req.body;

    const updateFields = {};

    if (name) updateFields.name = name;

    if (gender) updateFields.gender = gender;

    if (dob) updateFields.dob = dob;

    if (phoneNumber) updateFields.phoneNumber = phoneNumber;

    if (email) updateFields.email = email;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateFields.image = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.json({ status: false, message: "User not found" });
    }

    return res.json({
      status: true,
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
};

module.exports.addFavorite = async (req, res, next) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (user.favorites.includes(id)) {
      await User.updateOne({ _id: userId }, { $pull: { favorites: id } });
      res.status(200).json("Celebrity Unliked successfully");
    } else {
      await User.updateOne({ _id: userId }, { $push: { favorites: id } });
      res.status(200).json("Celebrity Liked successfully");
    }
  } catch (ex) {
    res.status(500).json({ status: false, message: ex.message });
  }
};

module.exports.getFavoriteCelebrities = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Extract favorite celebrities from user
    const favoriteCelebrities = user.favorites;

    res.status(200).json({ status: true, data: favoriteCelebrities });
  } catch (ex) {
    res.status(500).json({ status: false, message: ex.message });
  }
};
