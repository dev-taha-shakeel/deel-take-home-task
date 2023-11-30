import { Job, Contract, Profile, sequelize } from "../model";
import { Op } from "sequelize";

export const getAllUnpaidAndActiveContractJobs = async () => {
  return await Job.findAll({
    where: {
      paid: null,
    },
    include: [
      {
        model: Contract,
        where: {
          status: ["in_progress", "new"],
        },
      },
    ],
  });
};

export const getBestProfessionInRange = async (startDate, endDate) => {
  const result = await Contract.findAll({
    include: [
      {
        model: Profile,
        as: "Contractor",
        attributes: ["profession"],
        // where: {
        //   type: "contractor",
        // },
      },
      {
        model: Job,
        attributes: [
          "paymentDate",
          "price",
          [sequelize.fn("SUM", sequelize.col("price")), "totalPaid"],
        ],
        where: {
          paid: 1,
          paymentDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      },
    ],
    attributes: [
      [sequelize.literal('"Contractor"."profession"'), "profession"],
      [sequelize.fn("SUM", sequelize.col("Jobs.price")), "totalPaid"],
    ],

    group: ["Contractor.profession"],
    order: [[sequelize.fn("SUM", sequelize.col("Jobs.price")), "DESC"]],
    raw: true,
  });
  return result;
};

export const getBestClientInRange = async (startDate, endDate, limit) => {
  const result = await Contract.findAll({
    include: [
      {
        model: Profile,
        as: "Client",
        attributes: ["id"],
      },
      {
        model: Job,
        attributes: [
          [sequelize.fn("SUM", sequelize.col("price")), "totalPaid"],
        ],
        where: {
          paid: 1,
          paymentDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      },
    ],
    attributes: [
      "Client.id",
      "Client.firstName",
      "Client.lastName",
      [sequelize.fn("SUM", sequelize.col("Jobs.price")), "totalPaid"],
    ],
    group: ["Client.id"],
    order: [[sequelize.fn("SUM", sequelize.col("Jobs.price")), "DESC"]],
    raw: true,
  });
  return result;
};
