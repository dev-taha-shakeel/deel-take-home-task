import { IProfiles } from "./Api/interface";

export interface IGlobalContext {
  loggedInUser?: IProfiles | null;
  updateLoggednUser: any;
}
