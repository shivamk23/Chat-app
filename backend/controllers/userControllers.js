const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("failed to create User");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access
const authUser = asyncHandler(async (req, res) => {
  console.log("auth users");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  console.log(password);
  console.log(user.password);

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
    } else {
      if (result) {
        console.log("Password is correct");
      } else {
        console.log("Password is incorrect");
      }
    }
  });

  if (user) {
    console.log("bh");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("ahu");
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// /api/users?search=piyush
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ], //$regex :it provides regular expression capabilities for pattern matching strings in queries.
      }
    : {};

  const users = await User.findOne(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
