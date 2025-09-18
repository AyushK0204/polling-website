import express from "express";
import {
  createPoll,
  getPolls,
  getAdminPolls,
  getMyVotedPolls,
  getPoll,
  updatePoll,
  deletePoll,
  voteOnPoll,
} from "../controllers/pollController.js";

import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// route for admin to get all polls
router.route("/admin").get(protect, authorize("admin"), getAdminPolls);

// route for past voted polls
router.route("/my-votes").get(protect, getMyVotedPolls);

// routes for all poll and create a poll
router.route("/").get(getPolls).post(protect, authorize("admin"), createPoll);

// route for voting a poll
router.route("/:id/vote").put(protect, voteOnPoll);

// routes for getting, updating and deleting a pole
router
  .route("/:id")
  .get(getPoll)
  .put(protect, authorize("admin"), updatePoll)
  .delete(protect, authorize("admin"), deletePoll);

export default router;
