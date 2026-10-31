import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {

    FaUpload,

    FaRobot,

    FaFilePdf,

    FaCloudUploadAlt

} from "react-icons/fa";

import JobDescriptionInput from "../components/optimizer/JobDescriptionInput";
import LoadingAnimation from "../components/optimizer/LoadingAnimation";
import ATSScoreCards from "../components/optimizer/ATSScoreCards";
import SkillAnalysis from "../components/optimizer/SkillAnalysis";
import AISuggestions from "../components/optimizer/AISuggestions";
import OptimizedResume from "../components/optimizer/OptimizedResume";
import InterviewQuestions from "../components/optimizer/InterviewQuestions";

const ResumeOptimizer = () => {
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);

    const [jobDescription, setJobDescription] = useState("");

    const [loading, setLoading] = useState(false);

    const [analysis, setAnalysis] = useState(null);

    const [dragging, setDragging] = useState(false);

    const handleAnalyze = async () => {

        if (!resume) {

            return alert("Please upload your resume.");

        }

        if (!jobDescription.trim()) {

            return alert("Please paste the Job Description.");

        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", resume);

            formData.append(

                "jobDescription",

                jobDescription

            );

            const token = localStorage.getItem("token");

if (!token) {
    alert("Please login again.");
    return;
}

const response = await axios.post(
    "http://localhost:5000/api/optimizer/optimize",
    formData,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            setAnalysis(response.data.data);

        }

        catch (error) {

            console.error(error);

            alert(

                error?.response?.data?.message ||

                "Unable to analyze resume."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleDrop = (e) => {

        e.preventDefault();

        setDragging(false);

        if (e.dataTransfer.files.length > 0) {

            setResume(

                e.dataTransfer.files[0]

            );

        }

    };
        return (

        <div className="min-h-screen bg-black text-white relative overflow-hidden">

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />

                <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-blue-600/20 blur-[180px]" />

            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">

                {/* Header */}

                <div className="mb-14">

                    <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-2 rounded-full mb-5">

                        <FaRobot className="text-cyan-400"/>

                        <span className="text-cyan-300">

                            AI Powered Resume Intelligence

                        </span>

                    </div>

                    <h1 className="text-6xl font-bold leading-tight">

                        Resume Optimizer

                    </h1>

                    <p className="text-gray-400 text-lg mt-5 max-w-4xl leading-8">

                        Upload your resume and paste any Job Description.

                        AI compares both documents, improves ATS score,

                        optimizes resume content and prepares personalized

                        interview questions.

                    </p>

                </div>

                {/* Upload + Job Description */}

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Resume Upload */}

                    <div

                        onDragOver={(e)=>{

                            e.preventDefault();

                            setDragging(true);

                        }}

                        onDragLeave={()=>setDragging(false)}

                        onDrop={handleDrop}

                        className={`rounded-3xl border-2 transition-all duration-300 p-8 backdrop-blur-2xl

                        ${dragging

                        ? "border-cyan-400 bg-cyan-500/10"

                        : "border-white/10 bg-white/5"

                        }`}

                    >

                        <div className="flex items-center gap-5 mb-8">

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

                                <FaUpload className="text-2xl"/>

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Upload Resume

                                </h2>

                                <p className="text-gray-400">

                                    PDF Format Only

                                </p>

                            </div>

                        </div>

                        <label

                            htmlFor="resume"

                            className="block cursor-pointer"

                        >

                            <div className="border-2 border-dashed border-cyan-500/30 rounded-3xl p-12 text-center hover:border-cyan-400 transition-all">

                                <FaCloudUploadAlt className="text-7xl text-cyan-400 mx-auto mb-6"/>

                                <h3 className="text-2xl font-semibold">

                                    Drag & Drop Resume

                                </h3>

                                <p className="text-gray-400 mt-4">

                                    or click to browse your files

                                </p>

                                <div className="mt-8 inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold">

                                    Choose Resume

                                </div>

                            </div>

                            <input

                                id="resume"

                                type="file"

                                accept=".pdf"

                                className="hidden"

                                onChange={(e)=>setResume(e.target.files[0])}

                            />

                        </label>

                        {

                            resume && (

                                <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-center gap-5">

                                    <FaFilePdf className="text-4xl text-red-400"/>

                                    <div>

                                        <h3 className="font-semibold">

                                            {resume.name}

                                        </h3>

                                        <p className="text-gray-400 text-sm">

                                            Resume uploaded successfully

                                        </p>

                                    </div>

                                </div>

                            )

                        }

                    </div>

                    {/* Job Description */}

                    <JobDescriptionInput

                        jobDescription={jobDescription}

                        setJobDescription={setJobDescription}

                    />

                </div>

                {/* Analyze Button */}

                <div className="flex justify-center mt-12">

                    <button

                        onClick={handleAnalyze}

                        disabled={!resume || !jobDescription || loading}

                        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-5 rounded-2xl text-xl font-bold flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-50"

                    >

                        <FaRobot/>

                        Analyze & Optimize Resume

                    </button>

                </div>
                                {/* Loading */}

                {

                    loading && (

                        <LoadingAnimation/>

                    )

                }

                {/* Results */}

                {

                    analysis && (

                        <>

                            {/* Dashboard */}

                            <ATSScoreCards

                                analysis={analysis}

                            />

                            {/* Skills */}

                            <SkillAnalysis

                                analysis={analysis}

                            />

                            {/* AI Suggestions */}

                            <AISuggestions

                                analysis={analysis}

                            />

                            {/* Optimized Resume */}

                            <OptimizedResume

                                analysis={analysis}

                            />

                            {/* Interview Questions */}

                            <InterviewQuestions

                                analysis={analysis}

                            />

                        </>

                    )

                }

                {/* Footer */}

                <div className="mt-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-10">

                    <div className="grid lg:grid-cols-3 gap-10">

                        <div>

                            <h2 className="text-2xl font-bold mb-5">

                                AI Resume Optimizer

                            </h2>

                            <p className="text-gray-400 leading-8">

                                Improve ATS compatibility,

                                optimize resume content,

                                discover missing skills,

                                and prepare for interviews

                                using Generative AI.

                            </p>

                        </div>

                        <div>

                            <h3 className="text-xl font-semibold mb-5">

                                Features

                            </h3>

                            <ul className="space-y-3 text-gray-400">

                                <li>

                                    ✓ ATS Score Analysis

                                </li>

                                <li>

                                    ✓ Resume vs JD Matching

                                </li>

                                <li>

                                    ✓ AI Resume Optimization

                                </li>

                                <li>

                                    ✓ Missing Skill Detection

                                </li>

                                <li>

                                    ✓ Interview Questions

                                </li>

                            </ul>

                        </div>

                        <div>

                            <h3 className="text-xl font-semibold mb-5">

                                Powered By

                            </h3>

                            <div className="space-y-3 text-gray-400">

                                <p>

                                    React.js

                                </p>

                                <p>

                                    Spring Boot / Node.js

                                </p>

                                <p>

                                    MongoDB

                                </p>

                                    <p>
                                    Gemini AI
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                                <div className="mt-12 flex justify-center pb-10">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all font-semibold text-white"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

            </div>

        </div>

    );

};

export default ResumeOptimizer;