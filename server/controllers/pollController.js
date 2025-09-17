import Poll from "../models/poll.js";

// create a poll
export const createPoll = async (req, res) => {
  try {
    const { question, options, closesAt } = req.body;

    const poll = await Poll.create({
      question,
      options,
      closesAt,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: poll,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// get all polls
export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({
      closesAt: {
        $gt: new Date(),
      },
    }).populate("createdBy", "name");

    res.status(200).json({
      success: true,
      count: polls.length,
      data: polls,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get single poll
export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    res.status(200).json({
      success: true,
      data: poll,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// update a poll
export const updatePoll = async (req, res) => {
  try {
    let poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    if (poll.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authorized to update this poll",
      });
    }

    poll = await Poll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: poll,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// delete a poll
export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    if (poll.createdBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authorized to delete this poll",
      });
    }

    await poll.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// vote on a poll
export const voteOnPoll = async (req, res) => {
  try {
    const { optionId } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    if (new Date() > new Date(poll.closesAt)) {
      return res.status(400).json({
        success: false,
        message: "This poll is closed",
      });
    }

    if (poll.votedBy.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "You have already voted on this poll",
      });
    }

    const option = poll.options.id(optionId);
    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    option.votes += 1;
    poll.votedBy.push(req.user.id);

    await poll.save();

    res.status(200).json({
      success: true,
      message: "Your vote has been recorded",
      data: poll,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
