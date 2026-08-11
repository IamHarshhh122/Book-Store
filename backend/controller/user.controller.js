import User from "../model/user.modal.js";
import Book from "../model/book.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Bhai, ye email pehle se register hai!" });
        
        const hashedPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname,
            email,
            password: hashedPassword,
            reviews: [],
            purchaseHistory: []
        });
        await createdUser.save();
        
        res.status(201).json({
            message: "Congrats new created 😎",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Signup Error: " + error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = user ? await bcryptjs.compare(password, user.password) : false;

        if (!user || !isMatch) {
            return res.status(400).json({ message: "Oops! Email or password is incorrect. Try again..." });
        }
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                lastLogin: user.lastLogin,
                lastLogout: user.lastLogout,
                purchaseHistory: user.purchaseHistory || [],
                reviews: user.reviews || []
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Login Error" });
    }
};

// LOGOUT 
export const logout = async (req, res) => {
    try {
        const { userId } = req.body; 
        const user = await User.findById(userId);
        if (user) {
            user.lastLogout = new Date(); 
            await user.save();
            res.status(200).json({ message: "Logout successful, records updated!" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Logout Error" });
    }
};

// FOR PURCHASE BOOK 
export const purchaseBook = async (req, res) => {
    try {
        let { userId, bookId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        const alreadyOwns = user.purchaseHistory.some(item => item.bookId?.toString() === bookId);
        if (alreadyOwns) return res.status(400).json({ message: "Book already owned! Access it from your library section☺️ ☺️ ☺️" });

        user.purchaseHistory.push({ bookId: bookId, date: new Date() });
        await user.save();
        
        res.status(200).json({ message: "Book add ho gayi!", purchaseHistory: user.purchaseHistory });
    } catch (error) {
        res.status(500).json({ message: "Purchase Error" });
    }
};

// FOR GET MY BOOKS THROUGH MONGODB
export const getMyBooks = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("purchaseHistory.bookId");
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const myLibrary = user.purchaseHistory
            .filter(item => item.bookId !== null)
            .map(item => item.bookId);
            
        res.status(200).json(myLibrary);
    } catch (error) {
        res.status(500).json({ message: "Fetch Library Error" });
    }
};

// FOR ADMIN DATA 
export const getAllAdminsData = async (req, res) => {
    try {
        const allUsers = await User.find()
            .populate("purchaseHistory.bookId")
            .select("-password")
            .sort({ createdAt: -1 });
            
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Admin Data Error" });
    }
};

// SUBMIT REVIEW
export const submitReview = async (req, res) => {
    try {
        const { email, book, message, rating, name } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({ message: "Bhai, User nahi mila!" });

        user.reviews.push({
            name: name,
            bookName: book,
            message: message,
            rating: rating || 5,
            date: new Date()
        });

        await user.save();
        res.status(201).json({ message: "Review recorded, Bhai!" });
    } catch (error) {
        console.log("Error details:", error);
        res.status(500).json({ message: "Review save nahi hua!" });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User nahi mila, bhai!" });
        }

        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Delete Error: " + error.message });
    }
};
