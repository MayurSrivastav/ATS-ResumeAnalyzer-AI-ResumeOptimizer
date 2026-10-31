import React, { useMemo, useState } from "react";

import {

    FaCheckCircle,

    FaTimesCircle,

    FaSearch,

    FaLayerGroup

} from "react-icons/fa";

const SkillAnalysis = ({ analysis }) => {

    const [search, setSearch] = useState("");

    if (!analysis) return null;

    const matchedSkills = useMemo(() => {

        return analysis.matchedSkills.filter((skill) =>

            skill.toLowerCase().includes(search.toLowerCase())

        );

    }, [analysis.matchedSkills, search]);

    const missingSkills = useMemo(() => {

        return analysis.missingSkills.filter((skill) =>

            skill.toLowerCase().includes(search.toLowerCase())

        );

    }, [analysis.missingSkills, search]);

    return (

        <div className="mt-12">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                <div>

                    <h2 className="text-3xl font-bold">

                        Skill Analysis

                    </h2>

                    <p className="text-gray-400 mt-2">

                        Compare your resume skills against the job description.

                    </p>

                </div>

                <div className="relative w-full lg:w-96">

                    <FaSearch className="absolute left-4 top-4 text-gray-400"/>

                    <input

                        type="text"

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        placeholder="Search skill..."

                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all"

                    />

                </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Matched Skills */}

                <div className="bg-white/5 border border-green-500/20 rounded-3xl p-8 backdrop-blur-2xl">

                    <div className="flex items-center justify-between mb-8">

                        <div className="flex items-center gap-3">

                            <FaCheckCircle className="text-3xl text-green-400"/>

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Matched Skills

                                </h2>

                                <p className="text-gray-400">

                                    Skills already found in your resume.

                                </p>

                            </div>

                        </div>

                        <div className="bg-green-500/20 px-4 py-2 rounded-xl font-bold">

                            {matchedSkills.length}

                        </div>

                    </div>

                    <div className="flex flex-wrap gap-4">

                        {

                            matchedSkills.length === 0

                            ?

                            <p className="text-gray-500">

                                No skills found.

                            </p>

                            :

                            matchedSkills.map((skill,index)=>(

                                <div

                                    key={index}

                                    className="px-5 py-3 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center gap-3 hover:scale-105 transition-all"

                                >

                                    <FaCheckCircle className="text-green-400"/>

                                    {skill}

                                </div>

                            ))

                        }

                    </div>

                </div>

                {/* Missing Skills */}

                <div className="bg-white/5 border border-red-500/20 rounded-3xl p-8 backdrop-blur-2xl">

                    <div className="flex items-center justify-between mb-8">

                        <div className="flex items-center gap-3">

                            <FaTimesCircle className="text-3xl text-red-400"/>

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Missing Skills

                                </h2>

                                <p className="text-gray-400">

                                    Recommended skills to improve ATS score.

                                </p>

                            </div>

                        </div>

                        <div className="bg-red-500/20 px-4 py-2 rounded-xl font-bold">

                            {missingSkills.length}

                        </div>

                    </div>

                    <div className="flex flex-wrap gap-4">

                        {

                            missingSkills.length === 0

                            ?

                            <p className="text-green-400 font-semibold">

                                Excellent! No missing skills detected.

                            </p>

                            :

                            missingSkills.map((skill,index)=>(

                                <div

                                    key={index}

                                    className="px-5 py-3 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center gap-3 hover:scale-105 transition-all"

                                >

                                    <FaTimesCircle className="text-red-400"/>

                                    {skill}

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

            {/* Summary */}

            <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

                <div className="flex items-center gap-4 mb-4">

                    <FaLayerGroup className="text-cyan-400 text-2xl"/>

                    <h2 className="text-2xl font-bold">

                        Analysis Summary

                    </h2>

                </div>

                <p className="text-gray-300 leading-8">

                    Your resume currently matches

                    <span className="text-green-400 font-semibold">

                        {" "}{analysis.matchedSkills.length}{" "}

                    </span>

                    required skills and is missing

                    <span className="text-red-400 font-semibold">

                        {" "}{analysis.missingSkills.length}{" "}

                    </span>

                    skills from the provided Job Description.

                    Adding the missing technologies (where you genuinely have experience) and improving project descriptions can significantly improve your ATS compatibility.

                </p>

            </div>

        </div>

    );

};

export default SkillAnalysis;