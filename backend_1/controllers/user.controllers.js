const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middlewares");
const blacklistTokenModel = require("../models/blocklistToken.model");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    token,
    user,
  });
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email }, { fullname }, { password }]
  }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  const options = {
    httpOnly: true,
    secure: true,
  }
  res.cookie("token", token);
  res.status(200).json({ token, user });
  // return res.status(200).cookie("token", token,options).cookie("user", user,options).json({
  //   message: "User logged in successfully",
  //   token,
  //   user,
  // });
};
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "User logged out successfully" });
};
module.exports.updateUser = async (req, res, next) => {
  const { firstname, lastname } = req.body;
  const userId = req.user._id;
  const updatedUser = await userService.updateUser(userId, {
    firstname,
    lastname,
  });
  res.status(200).json({ message: "User updated successfully", updatedUser });
};