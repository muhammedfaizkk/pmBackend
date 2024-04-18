const mongoose = require("mongoose");

const DeptSceema = new mongoose.Schema({

    currentDate: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },

});

const depts = mongoose.model("Dept", DeptSceema);

module.exports = depts;