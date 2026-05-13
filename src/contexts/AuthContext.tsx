import { createContext, ReactNode, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function signIn(user: User) {
    setUser(user);
  }

  function signOut() {
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
