import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import PollCard from "../components/PollCard";
import { AppContext } from "../context/AppContext";

const HomePage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const { data } = await api.get("/polls");
        setPolls(data.polls);
      } catch (err) {
        setError("Could not fetch polls. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading polls...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {user ? `Welcome, ${user.name}!` : "Available Polls"}
      </h1>
      {polls.length === 0 ? (
        <p className="text-center text-gray-500">
          No polls available at the moment.
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

export default HomePage;
