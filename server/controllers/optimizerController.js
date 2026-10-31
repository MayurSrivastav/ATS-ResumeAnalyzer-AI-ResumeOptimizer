const optimizerService = require("../services/optimizerService");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const optimizeResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Resume PDF is required."
            });

        }

        const { jobDescription } = req.body;

        if (!jobDescription) {

            return res.status(400).json({
                success: false,
                message: "Job Description is required."
            });

        }

        const result = await optimizerService.optimize(
            req.file,
            jobDescription
        );

        await ResumeAnalysis.create({
            user: req.user.id,
            type: "optimization",
            resumeName: req.file.originalname,
            jobTitle: "Resume Optimization",
            atsScore: result.atsScore || 0,
            matchScore: result.matchScore || 0,
            matchedSkills: result.matchedSkills || [],
            missingSkills: result.missingSkills || []
        });

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Optimizer Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    optimizeResume
};