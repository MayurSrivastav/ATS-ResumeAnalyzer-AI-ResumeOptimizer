import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaRobot,
    FaFileAlt,
    FaBell,
    FaSignOutAlt,
    FaUserCircle,
    FaBrain,
    FaChartPie,
    FaCheckCircle
} from "react-icons/fa";

const Dashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [stats, setStats] = useState({
        totalAnalyses: 0,
        averageAtsScore: 0,
        optimizedResumes: 0,
        latestAtsScore: 0,
        latestMatchScore: 0
    });

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/analytics/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to load dashboard data."
                    );
                }

                setStats(
                    data.stats || {
                        totalAnalyses: 0,
                        averageAtsScore: 0,
                        optimizedResumes: 0,
                        latestAtsScore: 0,
                        latestMatchScore: 0
                    }
                );

                setActivities(data.activities || []);

            } catch (err) {

                console.error(
                    "Dashboard Error:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDashboardData();

    }, [navigate]);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    const sidebarLinks = [
        {
            title: "Dashboard",
            icon: <FaHome />,
            path: "/dashboard"
        },
        {
            title: "Resume Analyzer",
            icon: <FaRobot />,
            path: "/resume-analyzer"
        },
        {
            title: "Resume Optimizer",
            icon: <FaFileAlt />,
            path: "/resume-optimizer"
        }
    ];

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        const createdAt = new Date(date);

        const now = new Date();

        const difference =
            now.getTime() - createdAt.getTime();

        const minutes =
            Math.floor(difference / (1000 * 60));

        const hours =
            Math.floor(difference / (1000 * 60 * 60));

        const days =
            Math.floor(difference / (1000 * 60 * 60 * 24));

        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes} min ago`;
        }

        if (hours < 24) {
            return `${hours} hr ago`;
        }

        if (days === 1) {
            return "Yesterday";
        }

        if (days < 7) {
            return `${days} days ago`;
        }

        return createdAt.toLocaleDateString();

    };

    return (

        <div className="min-h-screen bg-black text-white flex relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">

                <div className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[180px]" />

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[180px]" />

            </div>

            <aside className="relative z-10 hidden lg:flex flex-col justify-between w-72 min-h-screen border-r border-white/10 bg-white/5 backdrop-blur-2xl p-6">

                <div>

                    <h1 className="text-3xl font-bold mb-12">
    ResuAI
</h1>

                    <div className="space-y-3">

                        {sidebarLinks.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                                        isActive
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg"
                                            : "hover:bg-white/10"
                                    }`
                                }
                            >

                                <span className="text-xl">
                                    {item.icon}
                                </span>

                                <span className="font-medium">
                                    {item.title}
                                </span>

                            </NavLink>

                        ))}

                    </div>

                </div>

                <div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

                                <FaUserCircle className="text-3xl" />

                            </div>

                            <div className="min-w-0">

                                <h2 className="font-semibold text-lg truncate">
                                    {user?.name || "User"}
                                </h2>

                                <p className="text-gray-400 text-sm truncate">
                                    {user?.email || ""}
                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-semibold transition-all"
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </aside>

            <main className="flex-1 relative z-10 overflow-y-auto">

                <div className="flex justify-between items-center px-10 py-8 border-b border-white/10">

                    <div>

                        <h1 className="text-5xl font-bold">
                            Welcome Back, {user?.name || "User"} 👋
                        </h1>

                        <p className="text-gray-400 mt-3 text-lg">
                            Improve your resume using AI and maximize your ATS score.
                        </p>

                    </div>

                    <div className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">

                        <FaBell className="text-xl" />

                    </div>

                </div>

                <div className="p-10">

                    {error && (

                        <div className="mb-8 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-5">
                            {error}
                        </div>

                    )}

                    {/* Real Statistics */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                            <FaBrain className="text-4xl text-cyan-400 mb-6" />

                            <h2 className="text-5xl font-bold">

                                {loading
                                    ? "..."
                                    : stats.totalAnalyses}

                            </h2>

                            <p className="text-gray-400 mt-3">
                                Total Resume Analyses
                            </p>

                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                            <FaChartPie className="text-4xl text-blue-400 mb-6" />

                            <h2 className="text-5xl font-bold">

                                {loading
                                    ? "..."
                                    : `${stats.averageAtsScore}%`}

                            </h2>

                            <p className="text-gray-400 mt-3">
                                Average ATS Score
                            </p>

                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                            <FaCheckCircle className="text-4xl text-green-400 mb-6" />

                            <h2 className="text-5xl font-bold">

                                {loading
                                    ? "..."
                                    : stats.optimizedResumes}

                            </h2>

                            <p className="text-gray-400 mt-3">
                                Optimized Resumes
                            </p>

                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                            <FaRobot className="text-4xl text-purple-400 mb-6" />

                            <h2 className="text-5xl font-bold">

                                {loading
                                    ? "..."
                                    : `${stats.latestAtsScore}%`}

                            </h2>

                            <p className="text-gray-400 mt-3">
                                Latest ATS Score
                            </p>

                        </div>

                    </div>

                    {/* Feature Cards */}

<div className="grid xl:grid-cols-2 gap-10 mt-12">

    {/* Resume Analyzer */}

    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-10 flex flex-col h-full">

        <div className="flex-1">

            <p className="text-purple-400 font-semibold mb-4">
                ANALYZE
            </p>

            <h1 className="text-5xl font-bold mb-6">
                Resume
                <br />
                Analyzer
            </h1>

            <p className="text-gray-300 leading-8 text-lg">
                Upload your resume and receive ATS analysis,
                keyword suggestions, resume score and AI insights.
            </p>

        </div>

        <button
            onClick={() => navigate("/resume-analyzer")}
            className="mt-10 bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all self-start"
        >
            Open Resume Analyzer
        </button>

    </div>


    {/* Resume Optimizer */}

    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-white/10 rounded-3xl p-10 flex flex-col h-full">

        <div className="flex-1">

            <p className="text-cyan-400 font-semibold mb-4">
                OPTIMIZE
            </p>

            <h1 className="text-5xl font-bold mb-6">
                Resume
                <br />
                Optimizer
            </h1>

            <p className="text-gray-300 leading-8 text-lg">
                Compare your resume with any Job Description,
                improve ATS compatibility, receive AI suggestions
                and generate personalized interview questions.
            </p>

        </div>

        <button
            onClick={() => navigate("/resume-optimizer")}
            className="mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all self-start"
        >
            Open Resume Optimizer
        </button>

    </div>

</div>

                    {/* Real Recent Activity */}

                    <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                        <h2 className="text-3xl font-bold mb-8">
                            Recent Activity
                        </h2>

                        {loading ? (

                            <p className="text-gray-400">
                                Loading activity...
                            </p>

                        ) : activities.length === 0 ? (

                            <div className="bg-white/5 rounded-2xl p-6">

                                <h3 className="text-xl font-semibold">
                                    No activity yet
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    Analyze or optimize a resume to see your activity here.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-5">

                                {activities.map((activity) => (

                                    <div
                                        key={activity._id}
                                        className="flex items-center justify-between bg-white/5 rounded-2xl p-5"
                                    >

                                        <div>

                                            <h3 className="text-xl font-semibold">

                                                {activity.type === "optimization"
                                                    ? "Resume Optimized"
                                                    : "Resume Analysis Completed"}

                                            </h3>

                                            <p className="text-gray-400">

                                                {activity.type === "optimization"
                                                    ? `ATS Score: ${activity.atsScore}% • Match: ${activity.matchScore}%`
                                                    : `ATS Score: ${activity.atsScore}% • Match: ${activity.matchScore}%`}

                                            </p>

                                        </div>

                                        <span className="text-cyan-400 font-semibold">

                                            {formatDate(activity.createdAt)}

                                        </span>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

};

export default Dashboard;