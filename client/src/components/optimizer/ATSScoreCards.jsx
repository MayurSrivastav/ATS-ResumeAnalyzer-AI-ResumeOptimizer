import React from "react";

import {

    FaChartLine,

    FaBullseye,

    FaCheckCircle,

    FaTimesCircle

} from "react-icons/fa";

const ATSScoreCards = ({ analysis }) => {

    if (!analysis) return null;

    const cards = [

        {

            title: "ATS Score",

            value: `${analysis.atsScore}%`,

            icon: <FaChartLine />,

            color:

                "from-cyan-500 to-blue-600",

            shadow:

                "shadow-cyan-500/20"

        },

        {

            title: "Resume Match",

            value: `${analysis.matchScore}%`,

            icon: <FaBullseye />,

            color:

                "from-purple-500 to-pink-600",

            shadow:

                "shadow-purple-500/20"

        },

        {

            title: "Matched Skills",

            value: analysis.matchedSkills.length,

            icon: <FaCheckCircle />,

            color:

                "from-green-500 to-emerald-600",

            shadow:

                "shadow-green-500/20"

        },

        {

            title: "Missing Skills",

            value: analysis.missingSkills.length,

            icon: <FaTimesCircle />,

            color:

                "from-red-500 to-orange-600",

            shadow:

                "shadow-red-500/20"

        }

    ];

    return (

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-12">

            {

                cards.map((card,index)=>(

                    <div

                        key={index}

                        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 hover:scale-[1.03] transition-all duration-300 shadow-2xl ${card.shadow}`}

                    >

                        <div

                            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}

                        />

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-400 text-sm">

                                    {card.title}

                                </p>

                                <h1 className="text-5xl font-bold mt-5">

                                    {card.value}

                                </h1>

                            </div>

                            <div

                                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl shadow-lg`}

                            >

                                {card.icon}

                            </div>

                        </div>

                        <div className="mt-8">

                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                                <div

                                    className={`h-full bg-gradient-to-r ${card.color}`}

                                    style={{

                                        width:

                                            card.title === "ATS Score"

                                            ?

                                            `${analysis.atsScore}%`

                                            :

                                            card.title === "Resume Match"

                                            ?

                                            `${analysis.matchScore}%`

                                            :

                                            "100%"

                                    }}

                                />

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default ATSScoreCards;