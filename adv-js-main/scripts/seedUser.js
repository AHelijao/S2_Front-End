const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/epita");
        console.log("Connected to MongoDB for user seeding");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

const seedUser = async () => {
    await connectDB();

    const email = "test@test.com";
    const password = "testpassword";
    const username = "Test User"; // Default username

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists. Skipping.");
        } else {
            const hash = bcrypt.hashSync(password, 10);
            const newUser = new User({
                email,
                username,
                password: hash,
                active: true
            });

            await newUser.save();
            console.log(`User ${email} created successfully.`);
        }
    } catch (error) {
        console.error("Error seeding user:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedUser();
