import { Router } from "express";
import {
  getBestProfession,
  getBestClients,
} from "../../services/ContractService";
import { getProfile } from "../../middleware/getProfile";

const AdminRouter = Router();

// Authenticated routes
AdminRouter.route("/best-profession").get(getProfile, getBestProfession);
AdminRouter.route("/best-clients").get(getProfile, getBestClients);

// AdminRouter.route("/:job_id/pay").post(getProfile, payToContractor);

export { AdminRouter };
