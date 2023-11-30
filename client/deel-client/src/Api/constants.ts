export const BASE_URL = `http://localhost:3001`;

export const FETCH_CLIENT_PROFILES = `${BASE_URL}/v1/profile/profiles/{clientType}`;
export const DEPOSIT_AMOUNT_URL = `${BASE_URL}/v1/profile/balances/deposit/{userId}`;
export const GET_PAID_UNPAID_JOBS_URL = `${BASE_URL}/v1/jobs/contracts/{contractorId}`;
export const PAY_FOR_JOB = `${BASE_URL}/v1/jobs//{jobId}/pay`;

export enum CLIENT_TYPE_ENUM {
  client = "client",
  contractor = "contractor",
}
