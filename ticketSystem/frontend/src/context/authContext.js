
import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_STATE":
      return { user: null, loading: true, error: null };
      case "LOGIN_SUCCESS":
        const expiryTime = new Date().getTime() + 30 * 60 * 1000; 
        localStorage.setItem("user", JSON.stringify(action.payload));
  
        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
  
        localStorage.setItem("expiry", expiryTime);
      
        return { user: action.payload, loading: false, error: null };
      
    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("expiry");
      localStorage.removeItem("token")
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const checkExpiry = () => {
      const expiry = localStorage.getItem("expiry");
      if (expiry && new Date().getTime() > parseInt(expiry)) {
        dispatch({ type: "LOGOUT" });
      }
    };
    checkExpiry();
    const interval = setInterval(checkExpiry, 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
