import React from "react";
import { FaBriefcase } from "react-icons/fa";

const JobDescriptionInput = ({

    jobDescription,

    setJobDescription

}) => {

    return (

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 h-full">

            <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">

                    <FaBriefcase className="text-2xl"/>

                </div>

                <div>

                    <h2 className="text-2xl font-bold">

                        Job Description

                    </h2>

                    <p className="text-gray-400 text-sm mt-1">

                        Paste the complete Job Description below.

                    </p>

                </div>

            </div>

            <textarea

                rows={18}

                value={jobDescription}

                onChange={(e)=>setJobDescription(e.target.value)}

                placeholder="Paste the complete Job Description here..."
                className="w-full rounded-2xl bg-black/20 border border-white/10 p-5 resize-none outline-none focus:border-cyan-500 transition-all"

            />

            <div className="mt-6 flex justify-between items-center">

                <p className="text-gray-500 text-sm">

                    Characters

                </p>

                <p className="text-cyan-400 font-semibold">

                    {jobDescription.length}

                </p>

            </div>

        </div>

    );

};

export default JobDescriptionInput;