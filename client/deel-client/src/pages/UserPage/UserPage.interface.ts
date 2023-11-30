import { IProfiles } from "../../Api/interface";

export interface IUserPageProps {
  [key: string]: any;
}

export interface IAutoCompleteDataNormalized extends IProfiles {
  label: string;
}
