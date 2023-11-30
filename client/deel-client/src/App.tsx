import React, { createContext, useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./components/Header";

import "./App.css";
import { IGlobalContext } from "./interface";
import { IProfiles } from "./Api/interface";
import UserPage from "./pages/UserPage/UserPage";

export const GlobalContext = createContext<IGlobalContext>({
  loggedInUser: undefined,
  updateLoggednUser: () => {},
});

function App() {
  const [userLoggedIn, setLoggedInUser] = useState<IProfiles | null>(null);

  const handleLogin = (profile: IProfiles) => {
    setLoggedInUser(profile);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        loggedInUser: userLoggedIn,
        updateLoggednUser: setLoggedInUser,
      }}
    >
      <Header logout={handleLogout} />
      {!userLoggedIn ? <LoginPage handleLogin={handleLogin} /> : <UserPage />}
    </GlobalContext.Provider>
  );
}

export default App;
