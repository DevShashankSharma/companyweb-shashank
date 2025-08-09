const User = require('../models/User');
const Admin = require('../models/Admin');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, username, email, password, phone, address } = req.body;

        // Check if all fields are provided
        if (!name || !username || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

        // if password length is less than 8 characters
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // if email is not valid
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // if phone number is not 10 digits
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Phone number must be 10 digits long' });
        }


        // Create a new user
        const newUser = new User({ name, username, email, password, phone, address });
        await newUser.save();

        return res.status(200).json({
            success: true,
            isAdmin: false,
            user: {
                _id: newUser._id,
                username: newUser.username
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
        console.log(err)
    }
};

// Login for both user and admin
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for admin first
        const admin = await Admin.findOne({ username, password });
        if (admin) {
            return res.status(200).json({
                success: true,
                isAdmin: true,
            });
        }

        // Check for user
        const user = await User.findOne({ username, password });
        if (user) {
            return res.status(200).json({
                success: true,
                isAdmin: false,
                user: {
                    _id: user._id,
                    username: user.username
                }
            });
        }

        // Invalid credentials
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// verify admin secretKey, favoriteColor, adminPIN
const verifyAdminSecurity = async (req, res) => {
    try {
        const { secretKey, favoriteColor, adminPIN } = req.body;

        if (!secretKey || !favoriteColor || !adminPIN) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const isMatch =
            admin.secretKey === secretKey &&
            admin.favoriteColor === favoriteColor &&
            admin.adminPIN === adminPIN;

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Verification failed. Invalid credentials.' });
        }

        res.status(200).json({
            success: true,
            user: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};


const getUserData = async (req, res) => {
    const { id } = req.params;

    try {
        // Try to find admin first
        const admin = await Admin.findById(id).select('-password -secretKey');
        if (admin) {
            return res.status(200).json({
                isAdmin: true,
                data: {
                    name: admin.name,
                    username: admin.username,
                    email: admin.email,
                    phone: admin.phone,
                    address: admin.address
                }
            });
        }

        // If not admin, try to find normal user
        const user = await User.findById(id).select('-password');
        if (user) {
            return res.status(200).json({
                isAdmin: false,
                data: {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            });
        }

        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.error('Error in getUserData:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// check admin 
const checkAdmin = async (req, res) => {
    const { id, username } = req.body;

    try {
        // Check if the user is an admin
        const admin = await Admin.findOne({ _id: id, username });
        if (admin) {
            return res.status(200).json({ isAdmin: true });
        }

        // If not found in Admin collection, check User collection
        const user = await User.findOne({ _id: id, username });
        if (user) {
            return res.status(200).json({ isAdmin: false });
        }

        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.error('Error in checkAdmin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyAdminSecurity,
    checkAdmin,
    getUserData
};
