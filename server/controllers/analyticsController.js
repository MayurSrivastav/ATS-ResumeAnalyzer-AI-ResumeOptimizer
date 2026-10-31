const ResumeAnalysis = require("../models/ResumeAnalysis");

const getDashboardStats = async (req, res) => {

    try {

        const userId = req.user.id;

        const records = await ResumeAnalysis.find({
            user: userId
        })
        .sort({ createdAt: -1 });

        const analysisRecords = records.filter(
            record => record.type === "analysis"
        );

        const optimizationRecords = records.filter(
            record => record.type === "optimization"
        );

        const totalAnalyses = analysisRecords.length;

        const optimizedResumes = optimizationRecords.length;

        const allScores = analysisRecords
            .map(record => record.atsScore)
            .filter(score => typeof score === "number");

        const averageAtsScore =
            allScores.length > 0
                ? Math.round(
                    allScores.reduce(
                        (sum, score) => sum + score,
                        0
                    ) / allScores.length
                )
                : 0;

        const latestAnalysis =
            analysisRecords.length > 0
                ? analysisRecords[0]
                : null;

        const latestAtsScore =
            latestAnalysis
                ? latestAnalysis.atsScore
                : 0;

        const latestMatchScore =
            latestAnalysis
                ? latestAnalysis.matchScore
                : 0;

        return res.status(200).json({

            success: true,

            stats: {
                totalAnalyses,
                averageAtsScore,
                optimizedResumes,
                latestAtsScore,
                latestMatchScore
            },

            activities: records.slice(0, 5)

        });

    } catch (error) {

        console.error(
            "Analytics Controller Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch dashboard statistics."
        });

    }

};

module.exports = {
    getDashboardStats
};