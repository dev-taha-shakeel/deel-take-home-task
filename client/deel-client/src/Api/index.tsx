import axios, { AxiosResponse } from "axios";
import {
  IDepositResponse,
  IJobWithContract,
  ILoginRequest,
  IProfiles,
} from "./interface";
import {
  CLIENT_TYPE_ENUM,
  DEPOSIT_AMOUNT_URL,
  FETCH_CLIENT_PROFILES,
  GET_PAID_UNPAID_JOBS_URL,
  PAY_FOR_JOB,
} from "./constants";

export const fetchProfiles = async (type: CLIENT_TYPE_ENUM) => {
  const url = FETCH_CLIENT_PROFILES.replace("{clientType}", type);
  try {
    const response: AxiosResponse<IProfiles[], any> = await axios.get(url);
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("Something went wrong", e);
    alert("Something went wrong");
  }
};

export const depositBalance = async (userId: number, amount: number) => {
  const url = DEPOSIT_AMOUNT_URL.replace("{userId}", userId.toString());

  try {
    const response: AxiosResponse<IDepositResponse, any> = await axios.post(
      url,
      {
        depositAmount: amount,
      },
      {
        headers: {
          profile_id: userId,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("Something went wrong", e);
    alert("Something went wrong");
  }
};

export const getContractsAgainstContractor = async (
  userId: number,
  contractorId: number
) => {
  const url = GET_PAID_UNPAID_JOBS_URL.replace(
    "{contractorId}",
    contractorId.toString()
  );
  try {
    const response: AxiosResponse<IJobWithContract[], any> = await axios.get(
      url,
      {
        headers: {
          profile_id: userId,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("Something went wrong", e);
    alert("Something went wrong");
  }
};

export const payForJobAPICall = async (userId: number, jobId: number) => {
  const url = PAY_FOR_JOB.replace("{jobId}", jobId.toString());

  try {
    const response: AxiosResponse<any, any> = await axios.post(
      url,
      {},
      {
        headers: {
          profile_id: userId,
        },
      }
    );
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("Something went wrong", e);
    alert("Something went wrong");
  }
};
