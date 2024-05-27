const UserModel = require('../models/User');
const userController = {};
const bcrypt = require('bcrypt');

userController.getAllUsers = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action" });
        }
        
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

userController.getUserById = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action" });
        }

        const user = await UserModel.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

userController.createUser = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action" });
        }

        const { email, phoneNumber } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        if (phoneNumber && phoneNumber.length > 14) {
            return res.status(400).json({ message: "Phone number must not exceed 14 digits" });
        }

        const userData = { ...req.body };
        userData.lastUpdated = Date.now();

        const user = await UserModel.create(userData);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

userController.updateUser = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action" });
        }

        const { phoneNumber } = req.body;

        if (phoneNumber && phoneNumber.length > 14) {
            return res.status(400).json({ message: "Phone number must not exceed 14 digits" });
        }

        const userData = { ...req.body };
        userData.lastUpdated = Date.now();

        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(userData.password, salt);
            userData.password = hash;
        }

        const user = await UserModel.findByIdAndUpdate(req.params.id, userData, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



userController.deleteUser = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Unauthorized: Only administrators can perform this action" });
        }

        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = userController;
