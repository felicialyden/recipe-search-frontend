import { createContext, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type User = {
  name: number;
  email: string;
};

type AuthContextProps = {
  user: User | null;
  updateUser: (userData: User) => void;
  isLoggedIn: boolean;
  updateIsLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  updateUser: () => {},
  isLoggedIn: false,
  updateIsLoggedIn: () => {},
});

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const updateUser = (userData: User) => {
    setUser(userData)
  }

  const updateIsLoggedIn = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn)
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        isLoggedIn,
        updateIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
