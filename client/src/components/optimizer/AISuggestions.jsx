import React from "react";

import {

    FaLightbulb,

    FaArrowUp,

    FaCopy,

    FaCheckCircle,

    FaExclamationTriangle

} from "react-icons/fa";

const AISuggestions = ({ analysis }) => {

    if (!analysis) return null;

    const getPriority = (index) => {

        if (index === 0)

            return {

                label: "High",

                color: "bg-red-500/20 text-red-400"

            };

        if (index === 1)

            return {

                label: "Medium",

                color: "bg-yellow-500/20 text-yellow-400"

            };

        return {

            label: "Low",

            color: "bg-green-500/20 text-green-400"

        };

    };

    const copySuggestion = async (text) => {

        try {

            await navigator.clipboard.writeText(text);

            alert("Suggestion copied!");

        }

        catch {

            alert("Unable to copy.");

        }

    };

    return (

        <div className="mt-12">

            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">

                    <FaLightbulb className="text-2xl"/>

                </div>

                <div>

                    <h2 className="text-3xl font-bold">

                        AI Suggestions

                    </h2>

                    <p className="text-gray-400 mt-1">

                        Personalized improvements based on your resume and Job Description.

                    </p>

                </div>

            </div>

            <div className="space-y-6">

                {

                    analysis.suggestions.map((item,index)=>{

                        const priority = getPriority(index);

                        return(

                            <div

                                key={index}

                                className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-2xl hover:border-cyan-500 transition-all"

                            >

                                <div className="flex justify-between items-start">

                                    <div className="flex items-start gap-5">

                                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">

                                            <FaExclamationTriangle className="text-yellow-400 text-xl"/>

                                        </div>

                                        <div>

                                            <h3 className="text-xl font-bold mb-3">

                                                Suggestion {index+1}

                                            </h3>

                                            <p className="text-gray-300 leading-8">

                                                {item}

                                            </p>
                                        </div>

                                    </div>

                                    <div>

                                        <span

                                            className={`px-4 py-2 rounded-xl text-sm font-semibold ${priority.color}`}

                                        >

                                            {priority.label}

                                        </span>

                                    </div>

                                </div>

                                <div className="flex gap-4 mt-8">

                                    <button

                                        onClick={()=>copySuggestion(item)}

                                        className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-all flex items-center gap-3"

                                    >

                                        <FaCopy/>

                                        Copy

                                    </button>

                                    <button

                                        className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition-all flex items-center gap-3"

                                    >

                                        <FaCheckCircle/>

                                        Accept

                                    </button>

                                    <button

                                        className="px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition-all flex items-center gap-3"

                                    >

                                        <FaArrowUp/>

                                        Improve

                                    </button>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

export default AISuggestions;