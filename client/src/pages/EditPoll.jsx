import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [closesAt, setClosesAt] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const { data } = await axios.get(`/api/polls/${id}`);
        setQuestion(data.poll.question);
        setOptions(data.poll.options);
        const date = new Date(data.poll.closesAt);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        setClosesAt(date.toISOString().slice(0, 16));
      } catch (err) {
        setError("Failed to fetch poll data.");
        console.error(err);
      }
    };
    fetchPoll();
  }, [id]);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].option = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, { option: "", votes: 0 }]);

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const validOptions = options.filter((opt) => opt.option.trim() !== "");
      if (validOptions.length < 2) {
        setError("A poll must have at least two options.");
        setLoading(false);
        return;
      }

      await axios.put(`/api/polls/${id}`, {
        question,
        options: validOptions,
        closesAt,
      });

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update poll.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Poll</h1>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Answer Options
            </label>
            <div className="space-y-2 mt-1">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    placeholder={`Option ${index + 1}`}
                    value={option.option}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addOption}
              className="mt-2 px-4 py-2 text-sm font-medium text-teal-700 bg-teal-100 rounded-md hover:bg-teal-200"
            >
              Add Option
            </button>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Poll"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPoll;
