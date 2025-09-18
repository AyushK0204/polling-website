import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PollCard = ({ poll }) => {
  const { user } = useContext(AppContext);

  // Determine the poll's status
  const isPollOpen = new Date(poll.closesAt) > new Date();
  const hasVoted = user && poll.votedBy?.includes(user.id);

  // Determine the correct text for the button
  const buttonText = isPollOpen && !hasVoted ? "Vote Now" : "View Results";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {poll.question}
      </h2>

      {/* Combined creator and closing time info */}
      <p className="text-sm text-gray-500 mb-4">
        By {poll.createdBy?.name || "Unknown"} | Status:
        <span
          className={`font-medium ${
            isPollOpen ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPollOpen
            ? ` Open until ${new Date(poll.closesAt).toLocaleString()}`
            : " Closed"}
        </span>
      </p>

      <Link
        to={`/poll/${poll._id}`}
        className="inline-block w-full text-center px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default PollCard;
