import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import {

    FaCloudUploadAlt,

    FaFileAlt,

    FaCheckCircle,

    FaBriefcase,

    FaUser,

    FaEnvelope,

    FaPhone,

    FaRedo,

    FaDownload

} from "react-icons/fa";

const ResumeAnalyzer = () => {
    
    const [uploaded, setUploaded] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [jobDescription, setJobDescription] = useState("");

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

    if (!selectedFile) {
        alert("Please select a resume.");
        return;
    }

    try {

        setLoading(true);

        const formData = new FormData();

        formData.append("resume", selectedFile);
        formData.append("jobDescription", jobDescription);

        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        if (!token) {
            alert("Please login again.");
            return;
        }

        const response = await axios.post(
            "http://localhost:5000/api/resume/upload",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setAnalysis(response.data.analysis);
        setUploaded(true);

    } catch (err) {

        console.error("Resume Upload Error:", err);

        alert(
            err.response?.data?.message ||
            "Upload Failed"
        );

    } finally {

        setLoading(false);
    }
};

    const uploadAnotherResume = () => {

        setUploaded(false);

        setAnalysis(null);

        setSelectedFile(null);

        setJobDescription("");

    };
        return (

        <div className="min-h-screen bg-black text-white overflow-hidden">

            {/* Background */}

            <div className="fixed inset-0 pointer-events-none">

                <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-blue-600 opacity-20 blur-[150px]" />

                <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyan-600 opacity-20 blur-[150px]" />

            </div>

            <div className="relative z-10 p-10">

                {/* Heading */}

                <div className="text-center mb-20">

                    <h1 className="text-6xl font-extrabold mb-6">

                        AI Resume Analyzer

                    </h1>

                    <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-9">

                        Upload your resume, compare it with any Job Description,

                        calculate ATS compatibility, detect missing skills,

                        and receive AI powered recommendations.

                    </p>

                </div>

                {

                    !uploaded && (

                        <div className="max-w-5xl mx-auto">

                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">

                                <h2 className="text-4xl font-bold mb-10">

                                    ATS Resume Analyzer

                                </h2>

                                {/* Job Description */}

                                <div className="mb-10">

                                    <label className="flex items-center gap-3 text-xl font-semibold mb-4">

                                        <FaBriefcase />

                                        Job Description

                                    </label>

                                    <textarea

                                        rows={8}

                                        value={jobDescription}

                                        onChange={(e)=>setJobDescription(e.target.value)}

                                        placeholder="Paste complete Job Description here..."

                                        className="w-full rounded-2xl bg-black/40 border border-white/10 p-6 outline-none resize-none focus:ring-2 focus:ring-blue-500"

                                    />

                                </div>

                                {/* Upload */}

                                <div className="border-2 border-dashed border-blue-500 rounded-3xl p-12 text-center">

                                    <FaCloudUploadAlt

                                        size={70}

                                        className="mx-auto text-blue-400 mb-6"

                                    />

                                    <h3 className="text-3xl font-bold mb-4">

                                        Upload Resume

                                    </h3>

                                    <p className="text-gray-400 mb-8">

                                        Upload your resume in PDF format.

                                    </p>

                                    <input

                                        id="resumeUpload"

                                        type="file"

                                        accept=".pdf"

                                        className="hidden"

                                        onChange={(e)=>setSelectedFile(e.target.files[0])}

                                    />

                                    <label

                                        htmlFor="resumeUpload"

                                        className="cursor-pointer inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 font-bold hover:scale-105 transition"

                                    >

                                        Choose Resume

                                    </label>

                                    {

                                        selectedFile && (

                                            <div className="mt-8 rounded-2xl bg-green-500/10 border border-green-500 p-5">

                                                <div className="flex justify-center items-center gap-3">

                                                    <FaCheckCircle className="text-green-400"/>

                                                    <span>

                                                        {selectedFile.name}

                                                    </span>

                                                </div>

                                            </div>

                                        )

                                    }

                                </div>

                                <div className="mt-10">

                                    <button

                                        onClick={handleUpload}

                                        disabled={loading}

                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-bold hover:scale-[1.02] transition disabled:opacity-50"

                                    >

                                        {

                                            loading

                                            ? "Analyzing Resume..."

                                            : "Analyze Resume"

                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                }
                                {

                    uploaded && analysis && (

                        <div className="max-w-7xl mx-auto">

                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">

                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

                                    <div>

                                        <h2 className="text-4xl font-bold">

                                            Resume Analysis Report

                                        </h2>

                                        <p className="text-gray-400 mt-2">

                                            AI generated ATS compatibility report

                                        </p>

                                    </div>

                                    <button

                                        onClick={uploadAnotherResume}

                                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"

                                    >

                                        <FaRedo />

                                        Upload Another Resume

                                    </button>

                                </div>

                                {/* ATS Score */}

                                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-center mb-10">

                                    <h3 className="text-2xl font-semibold mb-6">

                                        ATS Score

                                    </h3>

                                    <h1 className="text-8xl font-extrabold">

                                        {analysis.atsScore}%

                                    </h1>

                                    <div className="w-full bg-white/20 rounded-full h-5 mt-8">

                                        <div

                                            className="bg-white h-5 rounded-full transition-all duration-700"

                                            style={{

                                                width: `${analysis.atsScore}%`

                                            }}

                                        />

                                    </div>

                                </div>

                                {/* Personal Information */}

                                <div className="grid md:grid-cols-3 gap-6 mb-10">

                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">

                                        <div className="flex items-center gap-4">

                                            <FaUser className="text-blue-400 text-2xl"/>

                                            <div>

                                                <p className="text-gray-400">

                                                    Name

                                                </p>

                                                <h3 className="font-bold text-lg">

                                                    {analysis.name || "Not Found"}

                                                </h3>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">

                                        <div className="flex items-center gap-4">

                                            <FaEnvelope className="text-green-400 text-2xl"/>

                                            <div>

                                                <p className="text-gray-400">

                                                    Email

                                                </p>

                                                <h3 className="font-bold break-all">

                                                    {analysis.email || "Not Found"}

                                                </h3>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">

                                        <div className="flex items-center gap-4">

                                            <FaPhone className="text-yellow-400 text-2xl"/>

                                            <div>

                                                <p className="text-gray-400">

                                                    Phone

                                                </p>

                                                <h3 className="font-bold">

                                                    {analysis.phone || "Not Found"}

                                                </h3>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Summary Cards */}

                                <div className="grid md:grid-cols-3 gap-6 mb-10">

                                    <div className="rounded-2xl bg-green-500/10 border border-green-500 p-8 text-center">

                                        <h2 className="text-5xl font-bold text-green-400">

                                            {analysis.matchedSkills?.length || 0}

                                        </h2>

                                        <p className="mt-3">

                                            Matched Skills

                                        </p>

                                    </div>

                                    <div className="rounded-2xl bg-red-500/10 border border-red-500 p-8 text-center">

                                        <h2 className="text-5xl font-bold text-red-400">

                                            {analysis.missingSkills?.length || 0}

                                        </h2>

                                        <p className="mt-3">

                                            Missing Skills

                                        </p>

                                    </div>

                                    <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500 p-8 text-center">

                                        <h2 className="text-5xl font-bold text-yellow-400">

                                            {analysis.suggestions?.length || 0}

                                        </h2>

                                        <p className="mt-3">

                                            Suggestions

                                        </p>

                                    </div>

                                </div>
                                                                {/* Matched Skills & Missing Skills */}

                                <div className="grid lg:grid-cols-2 gap-8 mb-10">

                                    {/* Matched Skills */}

                                    <div className="bg-white/5 border border-green-500/30 rounded-3xl p-8">

                                        <h2 className="text-3xl font-bold text-green-400 mb-6">

                                            ✅ Matched Skills

                                        </h2>

                                        <div className="flex flex-wrap gap-3">

                                            {

                                                analysis.matchedSkills?.length > 0

                                                ? analysis.matchedSkills.map((skill,index)=>(

                                                    <span

                                                        key={index}

                                                        className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500 text-green-300"

                                                    >

                                                        {skill}

                                                    </span>

                                                ))

                                                : (

                                                    <p className="text-gray-400">

                                                        No matched skills found.

                                                    </p>

                                                )

                                            }

                                        </div>

                                    </div>

                                    {/* Missing Skills */}

                                    <div className="bg-white/5 border border-red-500/30 rounded-3xl p-8">

                                        <h2 className="text-3xl font-bold text-red-400 mb-6">

                                            ❌ Missing Skills

                                        </h2>

                                        <div className="flex flex-wrap gap-3">

                                            {

                                                analysis.missingSkills?.length > 0

                                                ? analysis.missingSkills.map((skill,index)=>(

                                                    <span

                                                        key={index}

                                                        className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500 text-red-300"

                                                    >

                                                        {skill}

                                                    </span>

                                                ))

                                                : (

                                                    <p className="text-gray-400">

                                                        No missing skills found.

                                                    </p>

                                                )

                                            }

                                        </div>

                                    </div>

                                </div>

                                {/* Strengths */}

                                <div className="bg-white/5 border border-blue-500/30 rounded-3xl p-8 mb-10">

                                    <h2 className="text-3xl font-bold text-blue-400 mb-6">

                                        💪 Strengths

                                    </h2>

                                    <ul className="space-y-4">

                                        {

                                            analysis.strengths?.length > 0

                                            ? analysis.strengths.map((item,index)=>(

                                                <li

                                                    key={index}

                                                    className="flex items-start gap-3"

                                                >

                                                    <FaCheckCircle className="text-green-400 mt-1"/>

                                                    <span>

                                                        {item}

                                                    </span>

                                                </li>

                                            ))

                                            : (

                                                <li className="text-gray-400">

                                                    No strengths detected.

                                                </li>

                                            )

                                        }

                                    </ul>

                                </div>

                                {/* Suggestions */}

                                <div className="bg-white/5 border border-yellow-500/30 rounded-3xl p-8 mb-10">

                                    <h2 className="text-3xl font-bold text-yellow-400 mb-6">

                                        🚀 Suggestions

                                    </h2>

                                    <ul className="space-y-4">

                                        {

                                            analysis.suggestions?.length > 0

                                            ? analysis.suggestions.map((item,index)=>(

                                                <li

                                                    key={index}

                                                    className="flex items-start gap-3"

                                                >

                                                    <FaCheckCircle className="text-yellow-400 mt-1"/>

                                                    <span>

                                                        {item}

                                                    </span>

                                                </li>

                                            ))

                                            : (

                                                <li className="text-gray-400">

                                                    No suggestions available.

                                                </li>

                                            )

                                        }

                                    </ul>

                                </div>
                                                                {/* Action Buttons */}

                                <div className="flex flex-wrap justify-center gap-5">

                                    <button

                                        onClick={uploadAnotherResume}

                                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition"

                                    >

                                        <FaRedo />

                                        Upload Another Resume

                                    </button>

                                    <button

                                        onClick={() => window.print()}

                                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-105 transition"

                                    >

                                        <FaDownload />

                                        Download Report

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                }

            </div>

            <div className="mt-12 flex justify-center pb-10">
    <Link
        to="/dashboard"
        className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all font-semibold text-white"
    >
        ← Back to Dashboard
    </Link>
</div>

        </div>

        );

};

export default ResumeAnalyzer;