const mongoose = require("mongoose");

const ProjectScheema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    projectType: {
        type: String,
        required: true,
    },
    started: {
        type: String,
        required: true,
    },
    projectStatus: {
        type: String,
        required: true,
    },
    lastUpdated: {
        type: String,
        required: true,
    }
});

const addProject = mongoose.model("addProject", ProjectScheema);

module.exports = addProject;
