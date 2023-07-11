import { createContext, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/user/GetUserByEmail";

interface UserProps {
  id: string;
  username: string;
  email: string;
  perfilImage?: string;
  bannerImage?: string;
  projects?: [{
    titleProject: string, 
    id: string, 
    colorProject: string,
    participantes: string[]
  }];
  favProjects?: [];
}

interface Props {
  user: UserProps | null;
}

export const UserContext = createContext<Props>({
  user: null
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null >(null);
  const { data: sessionData } = useSession();
  const { data: userData, loading } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: sessionData?.user?.email
    },
    skip: !sessionData || !sessionData.user?.email
  });

  useEffect(() => {
    if (userData && userData.getUserByEmail) {
      const { id, username, email, perfilImage, bannerImage, projects, favProjects } = userData.getUserByEmail;
      setUser({ id, username, email, perfilImage, bannerImage, projects, favProjects });
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
