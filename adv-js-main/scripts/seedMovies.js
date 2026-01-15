const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Movie = require("../models/movieModel");
require("dotenv").config();

// Adjust path significantly since we are in adv-js-main/scripts/ and file is in S2_Front-End/movie_db.csv
const csvFilePath = path.join(__dirname, "../../movie_db.csv");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/epita");
        console.log("Connected to MongoDB for seeding");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n");
    const result = [];

    // Regex to handle quoted fields containing commas
    // This regex matches:
    // "measured content" OR non-comma-content
    const regex = /(?:^|,)(?:"([^"]*)"|([^",]*))/g;

    // Skip header if it exists? The file viewed previously didn't seem to have a header, it started with data.
    // The first line was: 112,Cyber Hell...
    // So NO header.

    for (const line of lines) {
        if (!line.trim()) continue;

        const matches = [];
        let match;
        // Reset lastIndex because we are properly reusing regex or creating new one? 
        // `exec` loop on a global regex is better.
        let currentLineRegex = /(?:^|,)(?:"([^"]*)"|([^",]*))/g;

        while ((match = currentLineRegex.exec(line))) {
            // match[1] is quoted content, match[2] is unquoted
            let val = match[1] !== undefined ? match[1] : match[2];
            // remove undefineds or empty strings resulting from the split
            matches.push(val);
        }

        // The regex above adds an empty match at the end sometimes due to how split works, but let's be careful.
        // A simpler parser for this specific CSV structure might be safer given the time.
        // Let's use a simple state machine parser for reliability.

        const row = [];
        let currentVal = '';
        let insideQuote = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                insideQuote = !insideQuote;
            } else if (char === ',' && !insideQuote) {
                row.push(currentVal.trim());
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        row.push(currentVal.trim());

        if (row.length >= 8) {
            result.push({
                // dataset uses: id, title, release_date, author, type, poster, backdrop_poster, overview
                // we map to schema: title, release_date, author, type, poster, backdrop_poster, overview
                title: row[1],
                release_date: row[2],
                author: row[3],
                type: row[4],
                poster: row[5],
                backdrop_poster: row[6],
                overview: row[7]
            });
        }
    }
    return result;
};

const seed = async () => {
    await connectDB();

    try {
        if (fs.existsSync(csvFilePath)) {
            const csvData = fs.readFileSync(csvFilePath, "utf8");
            const movies = parseCSV(csvData);

            console.log(`Found ${movies.length} movies to insert.`);

            // Clear existing
            await Movie.deleteMany({});
            console.log("Cleared existing movies.");

            await Movie.insertMany(movies);
            console.log("Movies inserted successfully!");
        } else {
            console.error("CSV file not found at " + csvFilePath);
        }
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        mongoose.connection.close();
    }
};

seed();
