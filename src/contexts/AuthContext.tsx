import { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  loggedInUser: string | null;
  loginState: string;
  updateLoginState: (state: string) => void;
  signUpUser: (email: string, password: string) => Promise<unknown>;
  loginUser: (email: string, password: string) => Promise<unknown>;
  logoutUser: (email: string) => Promise<unknown>;
  deleteUser: () => Promise<unknown>;
  changePassword: (password: string, newPassword: string) => Promise<unknown>;
  resetPassword: (newPassword: string) => Promise<unknown>;
  sendPasswordLink: (email: string) => Promise<unknown>;
  setSession: (accessToken: string, refreshToken: string) => Promise<unknown>;
};

export const AuthContext = createContext<AuthContextProps>({
  loggedInUser: null,
  loginState: "login",
  updateLoginState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUpUser: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logoutUser: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteUser: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendPasswordLink: () => new Promise((_resolve) => ""),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSession: () => new Promise((_resolve) => ""),
});

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [loginState, setLoginState] = useState<string>("login");
  const userFromStorage = localStorage.getItem("loggedInUser");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(
    userFromStorage || null
  );

  const url = import.meta.env.VITE_BACKEND_URL;

  const updateLoginState = (state: string) => {
    setLoginState(state);
  };

  const signUpUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${url}/api/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (json.error) {
        console.log("error");
        throw json.error;
      }
      setLoggedInUser(JSON.stringify(json));
      localStorage.setItem("loggedInUser", JSON.stringify(json));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      setLoggedInUser(JSON.stringify(json));
      localStorage.setItem("loggedInUser", JSON.stringify(json));
      return { success: true, userId: json };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logoutUser = async (email: string) => {
    try {
      const response = await fetch(`${url}/api/users/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const changePassword = async (password: string, newPassword: string) => {
    try {
      const response = await fetch(`${url}/api/users/password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, newPassword }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const sendPasswordLink = async (email: string) => {
    try {
      const response = await fetch(`${url}/api/users/reset-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const json = await response.json();
      console.log(json);
      if (json.error) {
        throw json.error;
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const resetPassword = async (newPassword: string) => {
    console.log(newPassword)
    try {
      const response = await fetch(`${url}/api/users/reset-password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `${url}/api/users/${JSON.parse(loggedInUser as string)}`,
        {
          method: "DELETE",
        }
      );
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const setSession = async (accessToken: string, refreshToken: string) => {
    try {
      const response = await fetch(`${url}/api/auth/session`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      console.log(json)
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loginState,
        updateLoginState,
        signUpUser,
        loginUser,
        logoutUser,
        deleteUser,
        changePassword,
        resetPassword,
        sendPasswordLink,
        setSession
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
