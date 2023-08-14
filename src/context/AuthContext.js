import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { verifyTokenRequest } from "../api/auth";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider!!");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, SetisAuthenticated] = useState(false);
  const [registerErrors, setregisterErrors] = useState([]);
  const [loading,setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      SetisAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setregisterErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      SetisAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setregisterErrors(error.response.data);
    }
  };

  const logout = async () => {
    Cookie.remove("token");
    SetisAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if (registerErrors.length > 0) {
      const timer = setTimeout(() => {
        setregisterErrors([]);
      }, 3000);
      //limpiar timer mediante funcion
      return () => clearTimeout(timer);
    }
  }, [registerErrors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookie.get();

      if (!cookies.token) {
        SetisAuthenticated(false);
        setUser(null);
        setLoading(false)
        return;
      }

      try {
        const res = await verifyTokenRequest();
        console.log(res.data);

        if (!res.data) {
          SetisAuthenticated(false);
          setUser(null);
          setLoading(false)
          return;
        }


        SetisAuthenticated(true);
        setUser(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        SetisAuthenticated(false);
        setUser(null);
        setLoading(false)
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        registerErrors,
        signin,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
