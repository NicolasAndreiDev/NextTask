import { createContext, useState } from "react";

//info User

interface UserProps {
  email: string;
  setEmail: (email: string) => void;
}

export const UserContext = createContext<UserProps>({
  email: "",
  setEmail: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};
