import React from "react";

import {

    FaRobot,

    FaCopy,

    FaDownload,

    FaCheckCircle,

    FaArrowRight

} from "react-icons/fa";

const OptimizedResume = ({ analysis }) => {

    if (!analysis) return null;

    const copyText = async (text) => {

        try {

            await navigator.clipboard.writeText(text);

            alert("Copied Successfully");

        }

        catch {

            alert("Unable to Copy");

        }

    };

    return (

        <div className="mt-12">

            <div className="flex items-center justify-between mb-8">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

                        <FaRobot className="text-2xl"/>

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold">

                            AI Optimized Resume

                        </h2>

                        <p className="text-gray-400 mt-1">

                            AI generated content based on the Job Description.

                        </p>

                    </div>

                </div>

                <button

                    className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all"

                >

                    <FaDownload/>

                    Download Resume

                </button>

            </div>

            {/* Summary */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl mb-8">

                <div className="flex items-center justify-between mb-6">

                    <h3 className="text-2xl font-bold">

                        Professional Summary

                    </h3>

                    <button

                        onClick={()=>copyText(analysis.optimizedSummary)}

                        className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl flex items-center gap-2"

                    >

                        <FaCopy/>

                        Copy

                    </button>

                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-6 leading-8">

                    {analysis.optimizedSummary}

                </div>

            </div>

            {/* Projects */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl mb-8">

                <h3 className="text-2xl font-bold mb-6">

                    Optimized Projects

                </h3>

                <div className="space-y-5">

                    {

                        analysis.optimizedProjects.map((project,index)=>(

                            <div

                                key={index}

                                className="bg-black/30 border border-white/10 rounded-2xl p-6"

                            >

                                <div className="flex items-start gap-4">

                                    <FaCheckCircle className="text-green-400 mt-1"/>

                                    <p className="leading-8">

                                        {project}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Before vs After */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                <h3 className="text-2xl font-bold mb-8">

                    AI Improvement Preview

                </h3>

                <div className="grid lg:grid-cols-2 gap-8">

                    <div>

                        <h4 className="text-xl font-semibold text-red-400 mb-4">

                            Before

                        </h4>

                        <div className="bg-black/30 border border-red-500/20 rounded-2xl p-6 min-h-[220px]">

                            <p className="text-gray-400 leading-8">

                                Your original resume summary and project
                                descriptions will appear here after parsing
                                the uploaded resume.

                            </p>

                        </div>

                    </div>

                    <div>

                        <h4 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-3">

                            <FaArrowRight/>

                            After AI Optimization

                        </h4>

                        <div className="bg-black/30 border border-green-500/20 rounded-2xl p-6 min-h-[220px]">

                            <p className="leading-8">

                                {analysis.optimizedSummary}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default OptimizedResume;