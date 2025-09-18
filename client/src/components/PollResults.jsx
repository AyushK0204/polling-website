import React from "react";

const PollResults = ({ poll }) => {
  // Calculate the total number of votes to determine percentages
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{poll.question}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Results ({totalVotes} {totalVotes === 1 ? "vote" : "votes"})
      </p>

      <div className="space-y-4">
        {poll.options.map((option) => {
          // Calculate the percentage for the progress bar width
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <div key={option._id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-700 font-medium">
                  {option.option}
                </span>
                <span className="text-gray-500 text-sm">
                  {option.votes} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-teal-500 h-4 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-center text-gray-400 mt-6">
        This poll{" "}
        {new Date() > new Date(poll.closesAt) ? "is closed" : "is still open"}.
      </p>
    </div>
  );
};

export default PollResults;
