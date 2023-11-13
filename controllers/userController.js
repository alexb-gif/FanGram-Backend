const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
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

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.json({ status: false, message: 'User not found' });
    }

    return res.json({ 
      status: true, 
      message: 'User details updated successfully', 
      user: updatedUser 
    });
  } catch (ex) {
    return res.json({ status: false, message: ex.message });
  }
}
