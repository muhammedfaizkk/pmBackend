const mongoose = require("mongoose");

const DeptsoppSceema = new mongoose.Schema({

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

const deptsopp = mongoose.model("Deptopp", DeptsoppSceema);

module.exports = deptsopp;