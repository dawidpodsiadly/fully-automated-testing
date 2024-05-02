const UserModel = require('../models/User');

const userController = {};

userController.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

userController.getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

userController.createUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

userController.deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = userController;
