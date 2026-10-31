import React, { useState } from "react";

import {

    FaCode,

    FaUserTie,

    FaFolderOpen,

    FaUsers,

    FaChevronDown,

    FaChevronUp,

    FaCopy,

    FaSyncAlt

} from "react-icons/fa";

const InterviewQuestions = ({ analysis }) => {

    const [open, setOpen] = useState({

        technical: true,

        hr: false,

        project: false,

        behavioral: false

    });

    if (!analysis) return null;

    const copyQuestions = async () => {

        const text = [

            "Technical Questions",

            ...analysis.interviewQuestions.technical,

            "",

            "HR Questions",

            ...analysis.interviewQuestions.hr,

            "",

            "Project Questions",

            ...analysis.interviewQuestions.project,

            "",

            "Behavioral Questions",

            ...(analysis.interviewQuestions.behavioral || [])

        ].join("\n");

        await navigator.clipboard.writeText(text);

        alert("Questions Copied");

    };

    const Section = ({

        title,

        icon,

        type,

        questions,

        color

    }) => (

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

            <button

                onClick={()=>

                    setOpen({

                        ...open,

                        [type]: !open[type]

                    })

                }

                className="w-full flex justify-between items-center p-6"

            >

                <div className="flex items-center gap-4">

                    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>

                        {icon}

                    </div>

                    <h3 className="text-xl font-bold">

                        {title}

                    </h3>

                </div>

                {

                    open[type]

                    ?

                    <FaChevronUp/>

                    :

                    <FaChevronDown/>

                }

            </button>

            {

                open[type] && (

                    <div className="px-6 pb-6 space-y-4">

                        {

                            questions.length === 0

                            ?

                            <p className="text-gray-500">

                                No questions generated.

                            </p>

                            :

                            questions.map((q,index)=>(

                                <div

                                    key={index}

                                    className="bg-black/30 border border-white/10 rounded-2xl p-5"

                                >

                                    <span className="font-semibold text-cyan-400">

                                        Q{index+1}.

                                    </span>

                                    {" "}

                                    {q}

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

    return (

        <div className="mt-12">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-3xl font-bold">

                        AI Interview Questions

                    </h2>

                    <p className="text-gray-400 mt-2">

                        Practice questions generated specifically for this job.

                    </p>

                </div>

                <div className="flex gap-4">

                    <button

                        onClick={copyQuestions}

                        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl flex items-center gap-3"

                    >

                        <FaCopy/>

                        Copy All

                    </button>

                    <button

                        className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-xl flex items-center gap-3"

                    >

                        <FaSyncAlt/>

                        Regenerate

                    </button>

                </div>

            </div>

            <div className="space-y-6">

                <Section

                    title="Technical Questions"

                    type="technical"

                    icon={<FaCode/>}

                    color="bg-cyan-500/20"

                    questions={analysis.interviewQuestions.technical}

                />

                <Section

                    title="HR Questions"

                    type="hr"

                    icon={<FaUserTie/>}

                    color="bg-purple-500/20"

                    questions={analysis.interviewQuestions.hr}

                />

                <Section

                    title="Project Questions"

                    type="project"

                    icon={<FaFolderOpen/>}

                    color="bg-green-500/20"

                    questions={analysis.interviewQuestions.project}

                />

                <Section

                    title="Behavioral Questions"

                    type="behavioral"

                    icon={<FaUsers/>}

                    color="bg-orange-500/20"

                    questions={analysis.interviewQuestions.behavioral || []}

                />

            </div>

        </div>

    );

};

export default InterviewQuestions;