const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
    },
    release_date: {
        type: Date,
        required: "Release date is required",
    },
    author: {
        type: String,
        required: "Author is required",
    },
    type: {
        type: String,
        required: "Type is required",
    },
    poster: {
        type: String,
    },
    backdrop_poster: {
        type: String,
    },
    overview: {
        type: String,
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Movie", movieSchema);
