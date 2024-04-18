const mongoose = require("mongoose");

const prayersScheem = new mongoose.Schema({
    currentDate: {
        type: String,
        required: true,
    },
    Fajr: {
        type: String,
        required: true,
    },
    Dhuhr: {
        type: String,
        required: true,
    },
    Asr: {
        type: String,
        required: true,
    },
    Maghrib: {
        type: String,
        required: true,
    },
    Isha: {
        type: String,
        required: true,
    },
})

const prayer = mongoose.model("prayer", prayersScheem);

module.exports = prayer;
