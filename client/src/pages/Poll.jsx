import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import PollResults from "../components/PollResults";

const Poll = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  // Derived state to check if the current user has already voted
  const hasVoted = poll && user ? poll.votedBy.includes(user.id) : false;
  const isPollClosed = poll ? new Date() > new Date(poll.closesAt) : false;

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const { data } = await axios.get(`/api/polls/${id}`);
        setPoll(data.poll);
      } catch (err) {
        setError("Could not fetch the poll. It may not exist.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleVote = async (e) => {
    e.preventDefault();
    setError(null);
    if (!selectedOption) {
      setError("Please select an option to vote.");
      return;
    }
    try {
      // The backend uses the cookie to identify the user
      const { data } = await axios.put(`/api/polls/${id}/vote`, {
        optionId: selectedOption,
      });
      // Update the local state with the new poll data from the server
      setPoll(data.poll);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to record vote.");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading Poll...</p>;
  }

  if (error && !poll) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  if (!poll) {
    return <p className="text-center mt-8">Poll not found.</p>;
  }

  if (hasVoted || isPollClosed) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-2xl">
        <PollResults poll={poll} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        {error && <p className="text-center mb-4 text-red-500">{error}</p>}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {poll.question}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Created by: {poll.createdBy?.name || "Unknown"} | Closes on:{" "}
          {new Date(poll.closesAt).toLocaleString()}
        </p>

        <form onSubmit={handleVote}>
          <div className="space-y-4">
            {poll.options.map((option) => (
              <label
                key={option._id}
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="poll-option"
                  value={option._id}
                  checked={selectedOption === option._id}
                  onChange={() => setSelectedOption(option._id)}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-4 text-gray-700">{option.option}</span>
              </label>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={!user}
              className="w-full px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {user ? "Submit Your Vote" : "Please log in to vote"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Poll;
