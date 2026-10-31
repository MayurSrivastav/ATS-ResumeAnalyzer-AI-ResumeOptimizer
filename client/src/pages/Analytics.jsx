import React from "react";

const Analytics = () => {

  const skills = [
    {
      name: "React",
      score: 92,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "JavaScript",
      score: 88,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Problem Solving",
      score: 80,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Communication",
      score: 95,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const history = [
    {
      role: "Frontend Developer",
      score: "92%",
      date: "Today",
    },
    {
      role: "React Interview",
      score: "88%",
      date: "Yesterday",
    },
    {
      role: "DSA Mock Round",
      score: "84%",
      date: "2 Days Ago",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Effects */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[150px] rounded-full"></div>

      </div>

      {/* Main Content */}

      <div className="relative z-10 p-10">

        {/* Heading */}

        <div className="mb-16">

          <h1 className="text-6xl font-bold mb-5">
            Performance Analytics
          </h1>

          <p className="text-gray-400 text-xl max-w-3xl leading-9">
            Track your interview progress, AI evaluations, strengths, weaknesses, and technical growth over time.
          </p>

        </div>

        {/* Top Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

            <h2 className="text-gray-400 text-lg mb-4">
              Overall Performance
            </h2>

            <h1 className="text-6xl font-bold text-blue-400">
              91%
            </h1>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

            <h2 className="text-gray-400 text-lg mb-4">
              Interviews Completed
            </h2>

            <h1 className="text-6xl font-bold text-purple-400">
              24
            </h1>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

            <h2 className="text-gray-400 text-lg mb-4">
              Confidence Level
            </h2>

            <h1 className="text-6xl font-bold text-green-400">
              94%
            </h1>

          </div>

        </div>

        {/* Skill Analysis */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl mb-14">

          <h2 className="text-4xl font-bold mb-10">
            Skill Analysis
          </h2>

          <div className="space-y-8">

            {skills.map((skill, index) => (

              <div key={index}>

                <div className="flex justify-between mb-3">

                  <p className="text-xl">
                    {skill.name}
                  </p>

                  <p className="text-xl font-bold">
                    {skill.score}%
                  </p>

                </div>

                <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    style={{
                      width: `${skill.score}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Interview History */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl mb-14">

          <h2 className="text-4xl font-bold mb-10">
            Interview History
          </h2>

          <div className="space-y-6">

            {history.map((item, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between"
              >

                <div>

                  <h2 className="text-2xl font-bold mb-2">
                    {item.role}
                  </h2>

                  <p className="text-gray-400">
                    {item.date}
                  </p>

                </div>

                <div className="text-4xl font-bold text-blue-400">

                  {item.score}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl">

          <h2 className="text-4xl font-bold mb-8">
            AI Recommendations
          </h2>

          <div className="space-y-6 text-lg text-gray-300 leading-9">

            <p>
              ✅ Improve advanced JavaScript optimization concepts.
            </p>

            <p>
              ✅ Practice more DSA medium-level interview problems.
            </p>

            <p>
              ✅ Your communication skills are excellent.
            </p>

            <p>
              ✅ Focus more on system design explanations.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;