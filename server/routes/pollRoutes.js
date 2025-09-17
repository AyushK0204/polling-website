import express from "express";
import {
  createPoll,
  getPolls,
  getPoll,
  updatePoll,
  deletePoll,
  voteOnPoll,
} from "../controllers/pollController.js";

import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// routes for all poll and create a poll
router
  .route("/")
  .get(protect, getPolls)
  .post(protect, authorize("admin"), createPoll);

// route for voting a poll
router.route("/:id/vote").put(protect, voteOnPoll);

// routes for getting, updating and deleting a pole
router
  .route("/:id")
  .get(protect, getPoll)
  .put(protect, authorize("admin"), updatePoll)
  .delete(protect, authorize("admin"), deletePoll);

export default router;
