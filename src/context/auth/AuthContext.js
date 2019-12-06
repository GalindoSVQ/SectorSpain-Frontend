import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from "react";

import http, { setAuthToken } from "../../api/http";
import { useUnmounted } from "../../ui/components/hooks/useUnmounted";

export const AuthContext = createContext({
  loggedIn: false,
  initialized: false,
  attemptingLogin: false,
  login: () => null,
  logout: () => null
});

export function useAuth() {
  return useContext(AuthContext);
}

export const LS_ACCESS_TOKEN_KEY = "sectorspain:access_token";
export const LS_REFRESH_TOKEN_KEY = "sectorspain:refresh_token";
export const LS_USER_LOGGED_ID = "sectorspain:user_loged_id";

export function AuthProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem(LS_ACCESS_TOKEN_KEY)
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem(LS_REFRESH_TOKEN_KEY)
  );
  const [userLogged, setUserLogged] = useState(() =>
    localStorage.getItem(LS_USER_LOGGED_ID)
  );

  const unmountedRef = useUnmounted();

  useEffect(() => {
    setAuthToken(accessToken);
    setLoggedIn(Boolean(accessToken));

    if (accessToken) {
      localStorage.setItem(LS_ACCESS_TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(LS_ACCESS_TOKEN_KEY);
    }

    if (refreshToken) {
      localStorage.setItem(LS_REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(LS_REFRESH_TOKEN_KEY);
    }

    if (userLogged) {
      localStorage.setItem(LS_USER_LOGGED_ID, userLogged);
    } else {
      localStorage.removeItem(LS_USER_LOGGED_ID);
    }

    setInitialized(true);
  }, [accessToken, refreshToken, userLogged]);

  async function login(dto) {
    try {
      setAttemptingLogin(true);
      const response = await http.post(
        `${http.defaults.baseURL}auth/login/`,
        dto
      );
      if (unmountedRef.current) return;
      setError(null);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      setUserLogged(response.data.user);
    } catch (e) {
      if (unmountedRef.current) return;
    } finally {
      setAttemptingLogin(false);
    }
  }

  const refresh = useCallback(async () => {
    try {
      if (!refreshToken) {
        setAccessToken(null);
        return;
      }

      const response = await http.post(
        `${http.defaults.baseURL}auth/token/refresh/`,
        { refresh: refreshToken }
      );

      if (unmountedRef.current) return;

      setAccessToken(response.data.access);
    } catch (e) {
      if (unmountedRef.current) return;

      if (e.response.status === 401) {
        setRefreshToken(null);
      }
    }
  }, [refreshToken, unmountedRef]);

  async function logout() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoggedIn(false);
    setAccessToken(null);
    setRefreshToken(null);
    setUserLogged(null);
    setError(null);
  }

  useEffect(() => {
    const interceptor = http.interceptors.response.use(
      response => response,
      e => {
        if (!e.response) {
          return;
        }
        if (e.response.status === 400 || 401) {
          setError(true);
          refresh();
        }

        throw e;
      }
    );

    return () => {
      http.interceptors.response.eject(interceptor);
    };
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        attemptingLogin,
        initialized,
        error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
