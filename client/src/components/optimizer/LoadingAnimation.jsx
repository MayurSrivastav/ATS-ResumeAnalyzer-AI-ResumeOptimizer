import React from "react";
import {
    FaFilePdf,
    FaCheckCircle,
    FaRobot,
    FaSearch,
    FaQuestionCircle
} from "react-icons/fa";

const LoadingAnimation = () => {

    const steps = [

        {
            icon: <FaFilePdf />,
            title: "Parsing Resume",
            description: "Extracting information from uploaded PDF..."
        },

        {
            icon: <FaSearch />,
            title: "Comparing with Job Description",
            description: "Finding missing skills and ATS keywords..."
        },

        {
            icon: <FaRobot />,
            title: "Generating AI Suggestions",
            description: "Improving your resume using AI..."
        },

        {
            icon: <FaQuestionCircle />,
            title: "Creating Interview Questions",
            description: "Preparing personalized interview questions..."
        }

    ];

    return (

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 mt-12">

            <div className="flex items-center gap-4 mb-10">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

                    <FaRobot className="text-2xl animate-pulse"/>

                </div>

                <div>

                    <h2 className="text-3xl font-bold">

                        AI Processing

                    </h2>

                    <p className="text-gray-400">

                        Please wait while AI analyzes your resume.

                    </p>

                </div>

            </div>

            <div className="space-y-8">

                {

                    steps.map((step,index)=>(

                        <div

                            key={index}

                            className="flex items-start gap-6"

                        >

                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl animate-pulse">

                                {step.icon}

                            </div>

                            <div className="flex-1">

                                <div className="flex items-center justify-between">

                                    <h3 className="text-lg font-semibold">

                                        {step.title}

                                    </h3>

                                    <FaCheckCircle className="text-green-400 animate-bounce"/>

                                </div>

                                <p className="text-gray-400 mt-2">

                                    {step.description}

                                </p>

                                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">

                                    <div

                                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse"

                                        style={{

                                            width: `${(index + 1) * 25}%`

                                        }}

                                    />

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default LoadingAnimation;