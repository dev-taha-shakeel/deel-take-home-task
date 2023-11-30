import { IProfiles } from "../../Api/interface";

export interface ILoginPageProps {
  handleLogin: (profile: IProfiles) => void;
}
