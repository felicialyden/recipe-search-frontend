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
  isLoggedIn: boolean;
  updateIsLoggedIn: (loggedIn: boolean) => void;
  loginState: string;
  updateLoginState: (state: string) => void;
  signUpUser: (email: string, password: string) => Promise<unknown>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  updateUser: () => {},
  isLoggedIn: false,
  updateIsLoggedIn: () => {},
  loginState: "login",
  updateLoginState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUpUser: () => new Promise(_resolve => ''),
});

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<string>("login");

  const url = import.meta.env.VITE_BACKEND_URL;

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const updateIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  const updateLoginState = (state: string) => {
    setLoginState(state);
  };

  const signUpUser = async(email: string, password: string) => {
    console.log(email, password);
    try {
      const response = await fetch(`${url}/api/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      return 'user signed up'
    } catch (error) {
      console.log(error);
      return error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        isLoggedIn,
        updateIsLoggedIn,
        loginState,
        updateLoginState,
        signUpUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
