import {
  getAllProfiles,
  depositAmountForClient,
  getProfile,
} from "../repository/ProfileRepository";
import { sequelize } from "../model";

export const getProfiles = async (req, res, next) => {
  try {
    const { clientType } = req.params;
    const profiles = await getAllProfiles(clientType);

    return res.status(200).json(profiles);
  } catch (e) {
    return res.status("500").json({
      status: 500,
      success: false,
      error: e,
      message: e.message,
    });
  }
};

// ToDo: Did not understand the 25% constraint and is missing in this endpoint
export const depositAmount = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { depositAmount } = req.body;

    if (!depositAmount)
      return res
        .status(400)
        .send("Request body of { depositAmount: number } is required");
    const t = await sequelize.transaction();
    const profile = await getProfile(userId);
    if (profile.type === "client") {
      const newUpdatedBalance = profile.balance + depositAmount;
      await depositAmountForClient(profile.id, newUpdatedBalance, t);
      await t.commit();
      return res.status(200).json({
        id: profile.id,
        newBalance: newUpdatedBalance,
      });
    }
    return res
      .status(400)
      .send(`User with id: ${userId} is not of type client`);
  } catch (e) {
    return res.status("500").json({
      status: 500,
      success: false,
      error: e,
      message: e.message,
    });
  }
};
