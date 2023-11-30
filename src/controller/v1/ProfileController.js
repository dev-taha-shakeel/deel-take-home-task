import { Router } from "express";
import { getProfiles, depositAmount } from "../../services/ProfileService";
import { getProfile } from "../../middleware/getProfile";

const ProfileRouter = Router();

// Unauthenticated route
ProfileRouter.route("/profiles/:clientType").get(getProfiles);

// Authenticated routes
ProfileRouter.route("/balances/deposit/:userId").post(
  getProfile,
  depositAmount
);

export { ProfileRouter };
