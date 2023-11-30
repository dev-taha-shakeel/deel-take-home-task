import {
  getBestProfessionInRange,
  getBestClientInRange,
} from "../repository/ContractRepository";

export const getBestProfession = async (req, res, next) => {
  try {
    const { start, end, limit = 2 } = req.query;

    // Validate query parameters
    if (!start || !end) {
      return res
        .status(400)
        .json({ error: "Both start and end parameters are required." });
    }

    const bestProfession = await getBestProfessionInRange(start, end, limit);
    if (bestProfession && bestProfession.length > 0) {
      return res.status(200).json({
        bestProfession: bestProfession[0].profession,
        totalPaid: bestProfession[0].totalPaid,
        startDate: start,
        endDate: end,
      });
    }
    return res.status(400).send("Something went wrong");
    // const bestProfession = await findJobWithPaymentDateRange(start, end);
  } catch (e) {
    return res.status("500").json({
      status: 500,
      success: false,
      error: e,
      message: e.message,
    });
  }
};

export const getBestClients = async (req, res, next) => {
  try {
    const { start, end, limit = 2 } = req.query;

    // Validate query parameters
    if (!start || !end) {
      return res
        .status(400)
        .json({ error: "Both start and end parameters are required." });
    }

    const bestClient = await getBestClientInRange(start, end, limit);
    if (bestClient && bestClient.length > 0) {
      return res.status(200).json(
        bestClient
          .slice(0, bestClient.length < limit ? bestClient.length : limit)
          .map((record) => {
            return {
              id: record.id,
              fullName: `${record.firstName} ${record.lastName}`,
              paid: record.totalPaid,
            };
          })
      );
    }
    return res.status(400).send("Something went wrong");
  } catch (e) {
    return res.status("500").json({
      status: 500,
      success: false,
      error: e,
      message: e.message,
    });
  }
};
