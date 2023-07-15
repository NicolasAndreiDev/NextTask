import { createContext, useCallback, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/graphql/user/GetUserByEmail";
import { client } from "@/connection";

interface UserProps {
  id: string;
  username: string;
  email: string;
  perfilColor: string;
  bannerColor: string;
  favProjects?: [{projectId: string}];
  projects?: [{
    titleProject: string,
    id: string,
    userId: string,
    dataAcesso: Date,
    colorProject: string,
    participantes: string[],
    finishedProject: boolean,
    cardTasks: [{ id: string, titleCard: string, tasks: [{ id: string, titleTask: string, infoTask: string, finishedTask: boolean }] }]
  }];
}

interface Props {
  user: UserProps | null;
  updateUserInfo: () => void
}

export const UserContext = createContext<Props>({
  user: null,
  updateUserInfo: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const { data: sessionData } = useSession();
  const { data: userData, loading } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: sessionData?.user?.email
    },
    skip: !sessionData || !sessionData.user?.email,
  });
  
  const updateUserInfo = useCallback(() => {
    client.cache.reset();
    if (userData && userData.getUserByEmail) {
      const { id, username, email, perfilColor, bannerColor, projects, favProjects } = userData.getUserByEmail;
      setUser({ id, username, email, perfilColor, bannerColor, projects, favProjects });
    }
  }, [userData]);
  
  useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

  return (
    <UserContext.Provider value={{ user, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
