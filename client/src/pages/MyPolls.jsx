import React, { useState, useEffect } from "react";
import axios from "axios";
import PollCard from "../components/PollCard";

const MyPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVotedPolls = async () => {
      try {
        const { data } = await axios.get("/api/polls/my-votes");
        setPolls(data.polls);
      } catch (err) {
        setError("Could not fetch your voted polls.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVotedPolls();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading your polls...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Polls You've Voted On
      </h1>
      {polls.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't voted on any polls yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll._id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPolls;
