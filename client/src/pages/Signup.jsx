import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );

            console.log(
                "Signup response:",
                res.data
            );

            const token = res.data.token;

            if (!token) {
                throw new Error(
                    "Registration succeeded but no authentication token was returned."
                );
            }

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setLoading(false);

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Signup Error:",
                error
            );

            setLoading(false);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Signup Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-black text-white relative overflow-hidden">

            {/* Background Blur Effects */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">

                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

            </div>


            {/* Hero Section */}

            <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

                {/* Left Side */}

                <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-24 py-20">

                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-8">
                        Build a Better <br />
                        Resume with AI
                    </h1>

                    <p className="text-gray-300 text-lg lg:text-xl leading-9 max-w-xl">
                        Create your account and start analyzing your resume,
                        improving ATS compatibility, and preparing for your
                        target job with AI-powered insights.
                    </p>

                    <div className="mt-12 space-y-8 max-w-xl">

                        <div>

                            <h2 className="text-2xl font-bold mb-3">
                                Smart Resume Analysis
                            </h2>

                            <p className="text-gray-400 leading-7">
                                Compare your resume with any Job Description
                                and identify matched skills, missing skills,
                                and ATS compatibility.
                            </p>

                        </div>


                        <div>

                            <h2 className="text-2xl font-bold mb-3">
                                AI-Powered Optimization
                            </h2>

                            <p className="text-gray-400 leading-7">
                                Get personalized AI suggestions to improve
                                your resume summary, projects, skills, and
                                overall relevance to your target job.
                            </p>

                        </div>


                        <div>

                            <h2 className="text-2xl font-bold mb-3">
                                Personalized Interview Preparation
                            </h2>

                            <p className="text-gray-400 leading-7">
                                Generate technical, HR, project, and behavioral
                                interview questions based on the Job Description.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Right Side */}

                <div className="w-full lg:w-1/2 flex items-center justify-center py-20 px-6">

                    <div className="w-[380px] bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-4xl font-bold text-center mb-3">
                            Create Account
                        </h2>

                        <p className="text-gray-400 text-center mb-10">
                            Start your AI-powered resume journey
                        </p>


                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 mb-5 outline-none focus:border-blue-500 transition-all"
                            />


                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 mb-5 outline-none focus:border-blue-500 transition-all"
                            />


                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 mb-8 outline-none focus:border-blue-500 transition-all"
                            />


                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 p-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 disabled:opacity-50"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                        </form>


                        <p className="text-center text-gray-400 mt-8">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-blue-400 cursor-pointer hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>


            {/* Features Section */}

            <div className="relative z-10 px-10 lg:px-24 py-24">

                <h2 className="text-5xl font-bold text-center mb-20">
                    Start Your Resume Journey with AI
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold mb-4">
                            Smart Resume Analysis
                        </h3>

                        <p className="text-gray-400 leading-8">
                            Analyze your resume against any Job Description
                            and understand your matched and missing skills.
                        </p>

                    </div>


                    <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold mb-4">
                            AI Resume Optimization
                        </h3>

                        <p className="text-gray-400 leading-8">
                            Improve your resume with AI-generated suggestions
                            tailored to the requirements of your target role.
                        </p>

                    </div>


                    <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold mb-4">
                            Interview Preparation
                        </h3>

                        <p className="text-gray-400 leading-8">
                            Generate personalized technical, HR, project,
                            and behavioral questions from any Job Description.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;