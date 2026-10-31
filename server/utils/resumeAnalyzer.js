const skills = require("../data/skills");
const synonyms = require("../data/synonyms");
const weights = require("../data/weights");


function normalize(text = "") {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function extractName(text) {
    const lines = text.split("\n").map(line => line.trim()).filter(Boolean);

    for (const line of lines.slice(0, 8)) {

        if (
            line.length > 2 &&
            line.length < 40 &&
            /^[A-Za-z.\s]+$/.test(line) &&
            !line.toLowerCase().includes("resume") &&
            !line.toLowerCase().includes("curriculum") &&
            !line.toLowerCase().includes("email")
        ) {
            return line;
        }
    }

    return "Not Detected";
}

function extractEmail(text) {

    const match = text.match(
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    );

    return match ? match[0] : "Not Found";
}

function extractPhone(text) {

    const match = text.match(
        /(\+?\d{1,3}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4}/
    );

    return match ? match[0] : "Not Found";
}

function extractGithub(text) {

    const match = text.match(
        /(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+/i
    );

    return match ? match[0] : null;
}

function extractLinkedIn(text) {

    const match = text.match(
        /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i
    );

    return match ? match[0] : null;
}

function detectExperience(text) {

    const lower = normalize(text);

    const patterns = [

        /(\d+)\+?\s+years?/,

        /(\d+)\+?\s+yrs?/,

        /experience\s*:\s*(\d+)/,

        /(\d+)\s+year\s+experience/
    ];

    for (const pattern of patterns) {

        const match = lower.match(pattern);

        if (match) {

            return parseInt(match[1]);
        }
    }

    return 0;
}

function detectSections(text) {

    const lower = normalize(text);

    const possible = [

        "summary",
        "objective",
        "education",
        "experience",
        "projects",
        "skills",
        "technical skills",
        "certifications",
        "achievements",
        "internships",
        "languages",
        "interests",
        "publications"
    ];

    const found = [];

    possible.forEach(section => {

        if (lower.includes(section)) {

            found.push(section);
        }
    });

    return found;
}

function detectAchievements(text) {

    const patterns = [

        /\d+%/g,

        /\$\d+/g,

        /\d+\+/g,

        /\d+\s+users?/gi,

        /\d+\s+projects?/gi,

        /\d+\s+clients?/gi,

        /\d+\s+downloads?/gi
    ];

    let count = 0;

    patterns.forEach(pattern => {

        const matches = text.match(pattern);

        if (matches) {

            count += matches.length;
        }
    });

    return count;
}

function analyzeResumeLength(text) {

    const words = text.trim().split(/\s+/).length;

    if (words < 250) return "Too Short";

    if (words < 700) return "Good";

    if (words < 1200) return "Excellent";

    return "Too Long";
}

function findSkills(text) {

    const found = [];

    const lower = normalize(text);

    for (const [mainSkill, aliases] of Object.entries(synonyms)) {

        const exists = aliases.some(alias => {

            const normalizedAlias = normalize(alias);

            const escapedAlias = normalizedAlias.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            const regex = new RegExp(
                `(^|\\s|[^a-zA-Z0-9+#.])${escapedAlias}($|\\s|[^a-zA-Z0-9+#.])`,
                "i"
            );

            return regex.test(lower);

        });

        if (exists) {
            found.push(mainSkill);
        }
    }

    return [...new Set(found)];
}
function analyzeResume(resumeText, jobDescription = "") {

    const resume = normalize(resumeText);
    const jd = normalize(jobDescription);

    const name = extractName(resumeText);
    const email = extractEmail(resumeText);
    const phone = extractPhone(resumeText);

    const github = extractGithub(resumeText);
    const linkedIn = extractLinkedIn(resumeText);

    const experience = detectExperience(resumeText);

    const sections = detectSections(resumeText);

    const achievements = detectAchievements(resumeText);

    const resumeLength = analyzeResumeLength(resumeText);

    const resumeSkills = findSkills(resume);

    let jdSkills;

    if (jd.trim().length > 0) {

        jdSkills = findSkills(jd);

    } else {

        jdSkills = resumeSkills;
    }

    const matchedSkills = [];

    const missingSkills = [];

    jdSkills.forEach(skill => {

        if (resumeSkills.includes(skill)) {

            matchedSkills.push(skill);

        } else {

            missingSkills.push(skill);
        }

    });

    let totalWeight = 0;

    let obtainedWeight = 0;

    jdSkills.forEach(skill => {

        const weight = weights[skill] || 5;

        totalWeight += weight;

        if (matchedSkills.includes(skill)) {

            obtainedWeight += weight;
        }

    });

    let atsScore = 0;

    if (totalWeight > 0) {

        atsScore = Math.round(
            (obtainedWeight / totalWeight) * 100
        );

    } else {

        atsScore = Math.min(
            100,
            40 + resumeSkills.length * 2
        );
    }

    if (email !== "Not Found") atsScore += 3;

    if (phone !== "Not Found") atsScore += 3;

    if (github) atsScore += 3;

    if (linkedIn) atsScore += 3;

    if (sections.includes("projects")) atsScore += 4;

    if (sections.includes("education")) atsScore += 3;

    if (sections.includes("skills")) atsScore += 4;

    if (sections.includes("experience")) atsScore += 4;

    if (achievements >= 3) atsScore += 5;

    if (resumeLength === "Excellent") atsScore += 3;

    if (resumeLength === "Too Short") atsScore -= 10;

    atsScore = Math.max(0, Math.min(100, atsScore));

    let grade = "F";

    if (atsScore >= 95) grade = "A+";
    else if (atsScore >= 90) grade = "A";
    else if (atsScore >= 85) grade = "A-";
    else if (atsScore >= 80) grade = "B+";
    else if (atsScore >= 75) grade = "B";
    else if (atsScore >= 70) grade = "B-";
    else if (atsScore >= 65) grade = "C+";
    else if (atsScore >= 60) grade = "C";
    else if (atsScore >= 50) grade = "D";
        const strengths = [];

    if (matchedSkills.length >= 15)
        strengths.push("Excellent technical skill coverage.");

    else if (matchedSkills.length >= 10)
        strengths.push("Strong technical skill set.");

    else if (matchedSkills.length >= 5)
        strengths.push("Good technical foundation.");

    if (github)
        strengths.push("GitHub profile detected.");

    if (linkedIn)
        strengths.push("LinkedIn profile included.");

    if (experience > 0)
        strengths.push(`${experience}+ years of experience detected.`);

    if (sections.includes("projects"))
        strengths.push("Projects section present.");

    if (sections.includes("experience"))
        strengths.push("Experience section included.");

    if (sections.includes("education"))
        strengths.push("Education section included.");

    if (achievements >= 3)
        strengths.push("Resume contains measurable achievements.");

    if (resumeLength === "Excellent")
        strengths.push("Resume length is well balanced.");

    const suggestions = [];

    if (email === "Not Found")
        suggestions.push("Add a professional email address.");

    if (phone === "Not Found")
        suggestions.push("Include your phone number.");

    if (!github)
        suggestions.push("Add your GitHub profile.");

    if (!linkedIn)
        suggestions.push("Add your LinkedIn profile.");

    if (!sections.includes("summary") && !sections.includes("objective"))
        suggestions.push("Add a professional summary.");

    if (!sections.includes("projects"))
        suggestions.push("Include a projects section.");

    if (!sections.includes("skills"))
        suggestions.push("Add a technical skills section.");

    if (!sections.includes("experience"))
        suggestions.push("Include your work experience.");

    if (resumeLength === "Too Short")
        suggestions.push("Expand your resume with projects and achievements.");

    if (resumeLength === "Too Long")
        suggestions.push("Reduce unnecessary information and keep it concise.");

    if (missingSkills.length > 0)
        suggestions.push(
            `Consider adding relevant skills: ${missingSkills
                .slice(0, 8)
                .join(", ")}`
        );

    const categoryAnalysis = {};

    Object.entries(skills).forEach(([category, categorySkills]) => {

        const matched = categorySkills.filter(skill =>
            resumeSkills.includes(skill)
        );

        categoryAnalysis[category] = {
            matched: matched.length,
            total: categorySkills.length,
            skills: matched
        };

    });
    const matchScore =
    jdSkills.length > 0
        ? Math.round(
              (matchedSkills.length / jdSkills.length) * 100
          )
        : atsScore;

    return {

        name,

        email,

        phone,

        github,

        linkedIn,

        experience,

        atsScore,

        matchScore,

        grade,

        resumeLength,

        achievements,

        matchedSkills,

        missingSkills,

        strengths,

        suggestions,

        sections,

        categoryAnalysis

    };

}

module.exports = analyzeResume;