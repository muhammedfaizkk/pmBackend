const mongoose = require("mongoose");

const expenseSceema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    currentDate: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },

});

const expenses = mongoose.model("expenses", expenseSceema);

module.exports = expenses;