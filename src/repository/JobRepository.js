import { Job, Contract } from "../model";

export const getAllUnpaidAndActiveContractJobs = async (contractorId) => {
  return await Job.findAll({
    include: [
      {
        model: Contract,
        where: {
          ContractorId: contractorId,
        },
      },
    ],
  });
};

export const findJobWithId = async (jobId) => {
  return await Job.findOne({
    where: {
      id: jobId,
    },
    include: [
      {
        model: Contract,
      },
    ],
  });
};

export const markJobPaid = async (jobId, t) => {
  return await Job.update(
    {
      paid: 1,
    },
    {
      where: {
        id: jobId,
      },
    },
    { transaction: t }
  );
};
