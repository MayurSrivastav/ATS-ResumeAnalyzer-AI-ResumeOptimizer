const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateContent = async (prompt) => {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
        });

        return response.text;

    } catch (error) {

        console.error("Gemini Error:", error);

        throw error;

    }

};

module.exports = {
    generateContent
};