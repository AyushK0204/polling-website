import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const AdminDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPolls = async () => {
    try {
      const { data } = await api.get("/polls/admin");
      setPolls(data.polls);
    } catch (err) {
      setError("Could not fetch polls.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleDelete = async (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      try {
        await api.delete(`/polls/${pollId}`);
        fetchPolls();
      } catch (err) {
        alert("Failed to delete poll.");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/admin/create-poll"
          className="px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600"
        >
          + Create New Poll
        </Link>
      </div>

      {loading && <p>Loading polls...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold">Manage Polls</h2>
          </div>
          <div className="border-t border-gray-200">
            {polls.length > 0 ? (
              <ul>
                {polls.map((poll) => (
                  <li
                    key={poll._id}
                    className="flex justify-between items-center px-6 py-4 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {poll.question}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status:{" "}
                        {new Date(poll.closesAt) > new Date()
                          ? "Open"
                          : "Closed"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/poll/${poll._id}`}
                        className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/poll/${poll._id}/edit`}
                        className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(poll._id)}
                        className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-6">No polls found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
