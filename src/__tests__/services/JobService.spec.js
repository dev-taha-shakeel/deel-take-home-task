import { getUnpaidAndActiveContractJobs } from "../../services/JobService.js";
import { getAllUnpaidAndActiveContractJobs } from "../../repository/JobRepository.js";

jest.mock("../../repository/JobRepository.js");

describe("JobService test suite", () => {
  describe("getUnpaidAndActiveContractJobs ", () => {
    test("should get unpaid and active job contracts", async () => {
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

      getAllUnpaidAndActiveContractJobs.mockImplementationOnce(() =>
        Promise.resolve(expectedResult)
      );

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      await getUnpaidAndActiveContractJobs(req, res, next);

      expect(getAllUnpaidAndActiveContractJobs).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    test("should return error with statusCode 500", async () => {
      const errorObj = new Error("Something unexpected happened");
      const expectedErrorResponse = {
        status: 500,
        success: false,
        error: errorObj,
        message: errorObj.message,
      };

      getAllUnpaidAndActiveContractJobs.mockImplementationOnce(() =>
        Promise.reject(errorObj)
      );

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      await getUnpaidAndActiveContractJobs(req, res, next);

      expect(getAllUnpaidAndActiveContractJobs).toBeCalled();
      expect(res.status).toHaveBeenCalledWith("500");
      expect(res.json).toHaveBeenCalledWith(expectedErrorResponse);
    });
  });
});
