const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) return  res.status(404).json({ error : "user not found"});
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastname : "Changed"}); 
    return res.json({ status : "Success"});
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
        return res.json({ status : "Success"});
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender
    ){
      return res.status(400).json({ msg : "All fealds are required.."});
    }
    const result = await User.create({
      firstname : body.first_name,
      lastname : body.last_name,
      email : body.email,
      gender : body.gender,
    });
  
    return res.status(201).json({ msg : "Success", id : result._id});    
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}