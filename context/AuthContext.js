import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  userLogin: () => {},
  APIDATA: () => {},
  UserData: null,
  PlanData: null,
});

export const useAuthContext = () => useContext(AuthContext);
