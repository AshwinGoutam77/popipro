import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  userLogin: () => { },
  APIDATA: () => { },
  fetchData: () => { },
  UserData: null,
  PlanData: null,
  data: null,
  setData: null,
  Loader: null,
  setTodoData: null,
  TodoData: null,
  CartLoader: null,
  ErrorData: null
});

export const useAuthContext = () => useContext(AuthContext);
