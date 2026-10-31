const pdfParse = require("pdf-parse");

const analyzeResume = require("../utils/resumeAnalyzer");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No Resume Uploaded"
            });

        }

        const jobDescription = req.body.jobDescription || "";

        const pdf = await pdfParse(req.file.buffer);

        const resumeText = pdf.text;

        if (!resumeText || resumeText.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Unable to extract text from the uploaded PDF."
            });

        }

        const analysis = analyzeResume(
            resumeText,
            jobDescription
        );

        await ResumeAnalysis.create({
            user: req.user.id,
            type: "analysis",
            resumeName: req.file.originalname,
            jobTitle: "Resume Analysis",
            atsScore: analysis.atsScore,
            matchScore: analysis.matchScore,
            matchedSkills: analysis.matchedSkills,
            missingSkills: analysis.missingSkills
        });

        return res.status(200).json({
            success: true,
            analysis
        });

    } catch (error) {

        console.error("Resume Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    uploadResume
};