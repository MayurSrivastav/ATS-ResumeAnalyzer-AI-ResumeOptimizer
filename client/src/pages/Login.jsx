import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setLoading(false);

      navigate("/dashboard");

    } catch (error) {

      setLoading(false);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Blur Effects */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

      </div>


      {/* Hero Section */}

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">

        {/* Left Side */}

<div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-24 py-20">

  <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-4">
    ResuAI
  </h1>

  <p className="text-blue-400 text-xl lg:text-2xl font-semibold mb-6">
    AI-Powered Resume Analysis & Optimization
  </p>

  <p className="text-gray-300 text-lg lg:text-xl leading-8 max-w-xl">
    Analyze your resume, improve ATS compatibility, and tailor it
    to your target job with AI.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl">

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-bold mb-2">
        Smart Analysis
      </h3>

      <p className="text-gray-400 text-sm leading-6">
        ATS and Job Description matching.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-bold mb-2">
        AI Optimization
      </h3>

      <p className="text-gray-400 text-sm leading-6">
        Personalized resume improvements.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-bold mb-2">
        Interview Prep
      </h3>

      <p className="text-gray-400 text-sm leading-6">
        Targeted questions from your JD.
      </p>
    </div>

  </div>

</div>

        {/* Right Side */}

        <div className="w-full lg:w-1/2 flex items-center justify-center py-20 px-6">

          <div className="w-[380px] bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

            <h1 className="text-4xl font-bold text-center mb-3">
              Login
            </h1>

            <p className="text-gray-400 text-center mb-10">
              Continue your resume optimization journey
            </p>


            <form onSubmit={handleSubmit}>

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
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>


            <p className="text-center text-gray-400 mt-8">

              Don’t have an account?{" "}

              <Link
                to="/signup"
                className="text-blue-400 hover:underline"
              >
                Signup
              </Link>

            </p>

          </div>

        </div>

      </div>


      {/* Features Section */}

      <div className="relative z-10 px-10 lg:px-24 py-24">

        <h2 className="text-5xl font-bold text-center mb-20">
          Optimize Your Resume with AI
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


          {/* Feature 1 */}

          <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h3 className="text-2xl font-bold mb-4">
              Smart Resume Analysis
            </h3>

            <p className="text-gray-400 leading-8">
              Analyze your resume against any Job Description,
              identify relevant skills, and understand your ATS
              compatibility.
            </p>

          </div>


          {/* Feature 2 */}

          <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h3 className="text-2xl font-bold mb-4">
              AI Resume Optimization
            </h3>

            <p className="text-gray-400 leading-8">
              Receive AI-powered suggestions to improve your resume
              summary, projects, skills, and overall job relevance.
            </p>

          </div>


          {/* Feature 3 */}

          <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h3 className="text-2xl font-bold mb-4">
              Personalized Interview Preparation
            </h3>

            <p className="text-gray-400 leading-8">
              Practice technical, HR, project, and behavioral
              questions generated specifically from your target
              Job Description.
            </p>

          </div>


        </div>

      </div>

    </div>

  );

};

export default Login;