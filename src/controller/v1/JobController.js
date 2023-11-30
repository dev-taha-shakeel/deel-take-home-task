import { Router } from "express";
import {
  getUnpaidAndActiveContractJobs,
  payToContractor,
} from "../../services/JobService";
import { getProfile } from "../../middleware/getProfile";

const JobRouter = Router();

// Authenticated routes
JobRouter.route("/contracts/:contractorId").get(
  getProfile,
  getUnpaidAndActiveContractJobs
);

JobRouter.route("/:job_id/pay").post(getProfile, payToContractor);

export { JobRouter };
