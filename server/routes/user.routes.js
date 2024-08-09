const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const userRouter = express.Router();

const secreteKey = process.env.SECRETEKEY || "assignment";

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;


  if (!username || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {

    const oldUser = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (oldUser) {
      return res.status(400).send({
        message: oldUser.email === email
          ? `This email (${email}) is already registered. Please login.`
          : `This username (${username}) is already taken. Please choose another one.`,
      });
    }


    const hashPass = bcrypt.hashSync(password, 10);


    const user = new UserModel({ username, email, password: hashPass });
    await user.save();


    return res
      .status(200)
      .send({ message: "New user registered successfully!", user: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user._id }, secreteKey, {
          expiresIn: "1h",
        });
        return res.status(200).send({
          message: `User logged in successful`,
          token: token,
          user: user,
        });
      }

      return res.status(400).send("password not correct");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = userRouter;
