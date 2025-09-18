import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const options = [
        { option: option1 },
        { option: option2 },
        { option: option3 },
        { option: option4 },
      ].filter((opt) => opt.option.trim() !== "");

      if (options.length < 2) {
        setError("You must provide at least two options.");
        setLoading(false);
        return;
      }

      await api.post("/polls", {
        question,
        options,
        closesAt,
      });

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create poll.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create a New Poll
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-center text-red-500">{error}</p>}
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Poll Question
            </label>
            <input
              id="question"
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Answer Options (at least 2 required)
            </label>
            <div className="space-y-2 mt-1">
              <input
                type="text"
                required
                placeholder="Option 1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <input
                type="text"
                required
                placeholder="Option 2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <input
                type="text"
                placeholder="Option 3 (optional)"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <input
                type="text"
                placeholder="Option 4 (optional)"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="closesAt"
              className="block text-sm font-medium text-gray-700"
            >
              Poll Closes At
            </label>
            <input
              id="closesAt"
              type="datetime-local"
              required
              value={closesAt}
              onChange={(e) => setClosesAt(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Poll"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
