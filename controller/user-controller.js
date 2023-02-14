const mongoose = require('mongoose');
require('../models/users');
const User = mongoose.model("User");

const userAll = async (req, res) => {
  try {
    const userlist = await User.find();
    res.json({
      result: userlist,
      count:userlist.length
    });
  }
  catch (error) {
    res.send({ message: error });
  }
}

const createUser = async (req, res) => {
  console.log(req.body)
  const { action, value } = req.body;
  const { name,email,phone } = value;
  try {
    await User.create({
      name,
      email,
      phone
    });
    res.send({status:"OK"})
  }
  catch (error) {
    res.send({ status: "Something went wrong" })
  }
}

const user_details = async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.json({ message: error });
    }
};



// Update user
const user_update = async (req, res) => {
  const {  value } = req.body;
  const { name,email,phone } = value;
  try {
      const updatedUser = await User.findByIdAndUpdate(
        value._id,
        {
          name,
          email,
          phone
        },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.json({ message: error });
    }
};

// Delete user
const user_delete = async (req, res) => {
  try {
      const removeuser = await User.findByIdAndDelete(req.body.key);
      res.json(removeuser);
    } catch (error) { 
      res.json({ message: error });
    }
};

module.exports = {
  userAll,
  createUser,
  user_update,
  user_details,
  user_delete
}