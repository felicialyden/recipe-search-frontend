import { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type User = {
  email: string;
  password: string;
};

type AuthContextProps = {
  user: User | null;
  updateUser: (userData: User) => void;
  loggedInUser: string | null
  loginState: string;
  updateLoginState: (state: string) => void;
  signUpUser: (email: string, password: string) => Promise<unknown>;
  loginUser: (email: string, password: string) => Promise<unknown>;
  logoutUser: (email: string) => Promise<unknown>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  updateUser: () => {},
  loggedInUser: null,
  loginState: "login",
  updateLoginState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUpUser: () => new Promise(_resolve => ''),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser: () => new Promise(_resolve => ''),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logoutUser: () => new Promise(_resolve => ''),
});

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loginState, setLoginState] = useState<string>("login");
  const userFromStorage = localStorage.getItem('loggedInUser')
  const [loggedInUser, setLoggedInUser] = useState<string | null>(userFromStorage || null);

  const url = import.meta.env.VITE_BACKEND_URL;

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const updateLoginState = (state: string) => {
    setLoginState(state);
  };

  const signUpUser = async(email: string, password: string) => {
    try {
      const response = await fetch(`${url}/api/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json()
      if (json.error) {
        console.log('error')
        throw json.error
      }
      setLoggedInUser(JSON.stringify(json))
      localStorage.setItem('loggedInUser', JSON.stringify(json))
      return {success: true}
    } catch (error) {
      return {success: false, error}
    }
  };

  const loginUser = async(email: string, password: string) => {
    try {
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json()
      if (json.error) {
        throw json.error
      }
      setLoggedInUser(JSON.stringify(json))
      localStorage.setItem('loggedInUser', JSON.stringify(json))
      return {success: true, userId: json}
    } catch (error) {
      return {success: false, error}
    }
  };

  const logoutUser = async(email: string) => {
    try {
      const response = await fetch(`${url}/api/users/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const json = await response.json()
      if (json.error) {
        throw json.error
      }
      setLoggedInUser(null)
      localStorage.removeItem('loggedInUser')
      return {success: true}
    } catch (error) {
      return {success: false, error}
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        loggedInUser,
        loginState,
        updateLoginState,
        signUpUser,
        loginUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
