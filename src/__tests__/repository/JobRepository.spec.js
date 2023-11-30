import {
  markJobPaid,
  getAllUnpaidAndActiveContractJobs,
} from "../../repository/JobRepository";
import { Job, Contract } from "../../model";

jest.mock("../../model.js");

describe("Job Repository Tests", () => {
  describe("markJobPaid", () => {
    test("should mark job as paid", async () => {
      const jobId = 2;
      const transactionMock = jest.fn();

      // Mock implementation of the update method
      const updateRepoMock = Job.update.mockImplementationOnce(() =>
        Promise.resolve([1])
      );

      const updated = await markJobPaid(jobId, transactionMock);

      expect(updateRepoMock).toHaveBeenCalledWith(
        {
          paid: 1,
        },
        {
          where: {
            id: jobId,
          },
        },
        { transaction: transactionMock }
      );

      expect(updated).toEqual([1]);
    });

    test("should return 0 value when jobId not found", async () => {
      const jobId = 999;
      const transactionMock = jest.fn();

      // Mock implementation of the update method
      const updateRepoMock = Job.update.mockImplementationOnce(() =>
        Promise.resolve([0])
      );

      const updated = await markJobPaid(jobId, transactionMock);

      expect(updateRepoMock).toHaveBeenCalledWith(
        {
          paid: 1,
        },
        {
          where: {
            id: jobId,
          },
        },
        { transaction: transactionMock }
      );

      expect(updated).toEqual([0]);
    });
  });

  describe("getAllUnpaidAndActiveContractJobs", () => {
    test("should return unpaid and active job contracts", async () => {
      const expectedResult = [
        {
          id: 2,
          description: "work",
          price: 201,
          paid: null,
          paymentDate: null,
          createdAt: "2023-11-24T12:57:16.326Z",
          updatedAt: "2023-11-24T12:57:16.326Z",
          ContractId: 2,
          Contract: {
            id: 2,
            terms: "bla bla bla",
            status: "in_progress",
            createdAt: "2023-11-24T12:57:16.326Z",
            updatedAt: "2023-11-24T12:57:16.326Z",
            ContractorId: 6,
            ClientId: 1,
          },
        },
        {
          id: 3,
          description: "work",
          price: 202,
          paid: null,
          paymentDate: null,
          createdAt: "2023-11-24T12:57:16.326Z",
          updatedAt: "2023-11-24T12:57:16.326Z",
          ContractId: 3,
          Contract: {
            id: 3,
            terms: "bla bla bla",
            status: "in_progress",
            createdAt: "2023-11-24T12:57:16.326Z",
            updatedAt: "2023-11-24T12:57:16.326Z",
            ContractorId: 6,
            ClientId: 2,
          },
        },
      ];

      const findAllMock = Job.findAll.mockImplementationOnce(() =>
        Promise.resolve(expectedResult)
      );

      const jobs = await getAllUnpaidAndActiveContractJobs();

      expect(findAllMock).toHaveBeenCalledWith({
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
      expect(jobs).toEqual(expectedResult);
    });
  });
});
