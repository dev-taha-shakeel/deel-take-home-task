import {
  getAllUnpaidAndActiveContractJobs,
  findJobWithId,
  markJobPaid,
} from "../repository/JobRepository";
import { updateProfileById, getProfile } from "../repository/ProfileRepository";
import { sequelize } from "../model";

export const getUnpaidAndActiveContractJobs = async (req, res, next) => {
  const { contractorId } = req.params;

  console.log("id here...", contractorId);
  try {
    const jobs = await getAllUnpaidAndActiveContractJobs(contractorId);

    return res.status(200).json(jobs);
  } catch (e) {
    return res.status("500").json({
      status: 500,
      success: false,
      error: e,
      message: e.message,
    });
  }
};

export const payToContractor = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const { profile } = req;
    const job = await findJobWithId(job_id);
    console.log("job here...", job.Contract.ContractorId);
    if (!job) res.status(404).send(`Job with id ${job_id} not found`);
    if (!job.paid && profile.balance >= job.price) {
      const newClientBalance = profile.balance - job.price;
      const contractor = await getProfile(job.Contract.ContractorId);

      const newContractorBalance = contractor.balance + job.price;
      const t = await sequelize.transaction();
      await markJobPaid(job.id, t);
      await updateProfileById(profile.id, "balance", newClientBalance, t);
      await updateProfileById(
        contractor.id,
        "balance",
        newContractorBalance,
        t
      );
      await t.commit();
      return res.status(201).json({
        success: true,
      });
    } else {
      return res
        .status(400)
        .send("Job is paid for or balance is not sufficient");
    }
  } catch (e) {
    return res.status("500").json({
      status: 500,
      success: false,
      error: e,
      message: e.message,
    });
  }
};
