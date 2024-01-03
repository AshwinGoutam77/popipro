import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  cssObject: {},
  userLogin: () => {},
  setCSSObj: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
