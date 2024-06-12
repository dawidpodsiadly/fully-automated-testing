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

        const { birthDate, email, phoneNumber, password, contract } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        if (phoneNumber && (phoneNumber.length > 14 || phoneNumber.length < 9)) {
            return res.status(400).json({ message: "Phone number cannot be shorter than 9 digits or longer than 14" });
        }

        if (!password || password.length < 9) {
            return res.status(400).json({ message: "Password must be at least 9 characters long" });
        }

        if (birthDate && isNaN(Date.parse(birthDate))) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        
        if (contract) {
            if ((contract.startTime && isNaN(Date.parse(contract.startTime))) || (contract.endTime && isNaN(Date.parse(contract.endTime)))) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            if (contract && contract.endTime && contract.startTime && contract.endTime < contract.startTime) {
                return res.status(400).json({ message: "End time cannot be earlier than start time" });
            }
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

        const { birthDate, phoneNumber, password, contract } = req.body;

        if (phoneNumber && phoneNumber.length > 14) {
            return res.status(400).json({ message: "Phone number must not exceed 14 digits" });
        }

        if (password && password.length < 9) {
            return res.status(400).json({ message: "Password must be at least 9 characters long" });
        }

        if (birthDate && isNaN(Date.parse(birthDate))) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        if (contract) {
            if ((contract.startTime && isNaN(Date.parse(contract.startTime))) || (contract.endTime && isNaN(Date.parse(contract.endTime)))) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            if (contract && contract.endTime && contract.startTime && contract.endTime < contract.startTime) {
                return res.status(400).json({ message: "End time cannot be earlier than start time" });
            }
        }

        const userData = { ...req.body };
        userData.lastUpdated = Date.now();

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
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
