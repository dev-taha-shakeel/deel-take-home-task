export interface ILoginRequest {}

export interface IProfiles {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDepositResponse {
  id: number;
  newBalance: number;
}

export interface IContract {
  id: number;
  terms: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  ContractorId: number;
  ClientId: number;
}

export interface IJobWithContract {
  id: number;
  description: string;
  price: number;
  paid: any;
  paymentDate: any;
  createdAt: string;
  updatedAt: string;
  ContractId: number;
  Contract: IContract;
}
