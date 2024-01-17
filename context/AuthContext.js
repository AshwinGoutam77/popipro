import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  userLogin: () => {},
  APIDATA: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
