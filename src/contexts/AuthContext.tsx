import { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type User = {
  username: string;
  password: string;
};

type AuthContextProps = {
  user: User | null;
  updateUser: (userData: User) => void;
  isLoggedIn: boolean;
  updateIsLoggedIn: (loggedIn: boolean) => void;
  loginState: string
  updateLoginState: (state: string) => void
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  updateUser: () => {},
  isLoggedIn: false,
  updateIsLoggedIn: () => {},
  loginState: 'login',
  updateLoginState: () => {},
});

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<string>('login');

  const updateUser = (userData: User) => {
    setUser(userData)
  }

  const updateIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn)
  }

  const updateLoginState = (state: string) => {
    setLoginState(state)
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        isLoggedIn,
        updateIsLoggedIn,
        loginState,
        updateLoginState
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
