import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  access_token: Cookies.get("access_token") || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        access_token: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        access_token: action.payload.access_token,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        access_token: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      Cookies.remove("access_token");
      return {
        user: null,
        access_token: null,
        loading: false,
        error: null,
      };
    case "REGISTER_START":
      return {
        user: null,
        access_token: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        access_token: action.payload.access_token,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        access_token: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    Cookies.set("access_token", state.access_token, { httpOnly: true });
  }, [state.user, state.access_token]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        access_token: state.access_token,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
