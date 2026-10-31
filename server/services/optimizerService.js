const pdfParse = require("pdf-parse");

const { generateContent } = require("./aiService");
const analyzeResume = require("../utils/resumeAnalyzer");

const optimize = async (file, jobDescription) => {

    try {

        const pdf = await pdfParse(file.buffer);

        const resumeText = pdf.text.trim();

        if (!resumeText) {
            throw new Error(
                "Unable to extract text from the uploaded PDF."
            );
        }

        /*
         * RULE-BASED ANALYSIS
         *
         * These values come from the same engine
         * used by Resume Analyzer.
         */

        const analysis = analyzeResume(
            resumeText,
            jobDescription
        );

        /*
         * GEMINI
         *
         * Gemini only handles optimization and
         * interview preparation.
         */

        const prompt = `

You are an expert Resume Optimizer.

Your job is to improve the ORIGINAL RESUME according to the JOB DESCRIPTION while maintaining COMPLETE FACTUAL ACCURACY.

================ ORIGINAL RESUME ================

${resumeText}

================ JOB DESCRIPTION ================

${jobDescription}

=================================================

VERY IMPORTANT RULES:

1. NEVER invent or fabricate information.

2. NEVER add a technology, framework, programming language,
database, cloud platform, tool, certification, achievement,
job responsibility, project experience, or work experience
that is NOT supported by the original resume.

3. If the Job Description requires a technology that is missing
from the resume, DO NOT write that the candidate has experience
with that technology.

4. Missing skills may be mentioned in suggestions, but they must
NOT be presented as existing candidate skills.

5. Do NOT add JWT unless JWT is explicitly supported by the resume.

6. Do NOT add AWS unless AWS is explicitly supported by the resume.

7. Do NOT add Docker unless Docker is explicitly supported by the resume.

8. Do NOT add Spring Boot unless Spring Boot is explicitly
supported by the resume.

9. Do NOT add Microservices unless Microservices experience is
explicitly supported by the resume.

10. Do NOT add Spring Security unless it is explicitly supported
by the resume.

11. Do NOT add Kubernetes unless it is explicitly supported
by the resume.

12. Do NOT add CI/CD unless it is explicitly supported
by the resume.

13. Do NOT create fake metrics, percentages, achievements,
or performance numbers.

14. Preserve all existing factual information from the resume.

15. You may improve grammar, wording, clarity, action verbs,
ATS keyword placement, and professional presentation.

16. If the resume says "API", do not automatically claim
"REST API" unless REST is explicitly supported.

17. If a project uses JavaScript, NodeJS and React, do not
claim that it uses Java, Spring Boot, or other technologies
unless the original resume explicitly says so.

18. Only optimize projects using technologies and responsibilities
that are actually present in the original resume.

19. Interview questions MAY cover technologies from the Job
Description because they are preparation questions.

20. Do not imply that the candidate already has experience
with technologies that are only present in the Job Description.

21. The optimized summary must remain factually accurate.

=================================================

IMPORTANT:

DO NOT generate:

- atsScore
- matchScore
- matchedSkills
- missingSkills

These four values are calculated by the application's
rule-based Resume Analyzer.

You must NOT calculate, modify, estimate, or return these values.

=================================================

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT use code fences.

Use EXACTLY this structure:

{
    "suggestions": [
        "...",
        "...",
        "...",
        "..."
    ],

    "optimizedSummary": "...",

    "optimizedProjects": [
        "...",
        "..."
    ],

    "interviewQuestions": {
        "technical": [
            "...",
            "...",
            "...",
            "..."
        ],

        "hr": [
            "...",
            "...",
            "..."
        ],

        "project": [
            "...",
            "...",
            "..."
        ],

        "behavioral": [
            "...",
            "...",
            "..."
        ]
    }
}

=================================================
`;

        let response = await generateContent(prompt);

        response = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const start = response.indexOf("{");
        const end = response.lastIndexOf("}");

        if (start === -1 || end === -1) {

            throw new Error(
                "Gemini did not return valid JSON."
            );

        }

        const jsonString = response.substring(
            start,
            end + 1
        );

        let result;

        try {

            result = JSON.parse(jsonString);

        } catch (err) {

            console.log(
                "JSON Parse Error:",
                err
            );

            console.log(
                "Gemini Response:",
                jsonString
            );

            throw new Error(
                "Failed to parse AI response."
            );
        }

        /*
         * FINAL RESULT
         *
         * Scores and skills come from the
         * rule-based analyzer.
         *
         * Optimization content comes from Gemini.
         */

        return {

            atsScore:
                analysis.atsScore,

            matchScore:
                analysis.matchScore,

            matchedSkills:
                analysis.matchedSkills,

            missingSkills:
                analysis.missingSkills,

            suggestions:
                Array.isArray(result.suggestions)
                    ? result.suggestions
                    : [],

            optimizedSummary:
                result.optimizedSummary || "",

            optimizedProjects:
                Array.isArray(result.optimizedProjects)
                    ? result.optimizedProjects
                    : [],

            interviewQuestions:
                result.interviewQuestions || {
                    technical: [],
                    hr: [],
                    project: [],
                    behavioral: []
                }
        };

    } catch (error) {

        console.log(
            "Optimizer Service Error:",
            error.message
        );

        throw error;
    }
};

module.exports = {
    optimize
};