import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please provide a question for the poll"],
      trim: true,
    },
    options: {
      type: [optionSchema],
      validate: [
        {
          validator: function (val) {
            return val.length >= 2;
          },
          message: "Poll must have at least two options.",
        },
        {
          validator: function (val) {
            const optionTexts = val.map((opt) => opt.option);
            return new Set(optionTexts).size === optionTexts.length;
          },
          message: "Poll options must be unique.",
        },
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    closesAt: {
      type: Date,
      required: [true, "Please specify when the poll closes"],
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
