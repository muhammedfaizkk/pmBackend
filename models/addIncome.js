const mongoose = require("mongoose");

const incomeScheema = new mongoose.Schema({
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

const income = mongoose.model("income", incomeScheema);

module.exports = income;