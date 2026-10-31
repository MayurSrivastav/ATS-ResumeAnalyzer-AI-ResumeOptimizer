const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: ["analysis", "optimization"],
            required: true,
        },

        resumeName: {
            type: String,
            default: "Resume",
        },

        jobTitle: {
            type: String,
            default: "Job Application",
        },

        atsScore: {
            type: Number,
            default: 0,
        },

        matchScore: {
            type: Number,
            default: 0,
        },

        matchedSkills: {
            type: [String],
            default: [],
        },

        missingSkills: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "ResumeAnalysis",
    resumeAnalysisSchema
);