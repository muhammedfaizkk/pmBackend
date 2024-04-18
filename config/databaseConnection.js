const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected to ${connection.connection.host}`);
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToDatabase;
