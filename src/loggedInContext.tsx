import { createContext, useContext, useState } from "react";

type loginStatus =
  | null
  | "pending"
  | "loggedin"
  | "loggedout";

const LoggedInContext = createContext<loginStatus>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoggedInUpdateContext = createContext<any>(null);

export const useLoggedIn = () => useContext(LoggedInContext);
export const useLoggedInUpdate = () => useContext(LoggedInUpdateContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoggedInProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<loginStatus>(null);

  const toggleStatus = (val: loginStatus) => setIsLoggedIn(val);

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <LoggedInUpdateContext.Provider value={toggleStatus}>
        {children}
      </LoggedInUpdateContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;