import { useContext } from "react";
import AllProjects from "../AllProjects";
import { FiUsers } from 'react-icons/fi';
import { UserContext } from "@/providers/UserProvider";
import { useQuery } from "@apollo/client";
import { GET_PARTICIPATE_PROJECTS } from "@/graphql/projects/GetParticipateProjects";

export default function ParticipateProjects() {
    const { user } = useContext(UserContext);
    const { loading: loadingData, error: errorData, data: userData } = useQuery(GET_PARTICIPATE_PROJECTS, {
      variables: {
        userId: user?.id,
      },
    });
    const Icon = <FiUsers />;
  
    return (
      <>
        {userData?.getParticipateProjects?.length > 0 && (
          <AllProjects projectsList={userData.getParticipateProjects} title={"Participate Projects"} icon={Icon} />
        )}
      </>
    );
  }