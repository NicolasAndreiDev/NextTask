import { useContext } from "react";
import AllProjects from "../AllProjects";
import { FiUsers } from 'react-icons/fi';
import { ParticipateProjectsContext } from "@/providers/ParticipateProjectsProvider";

export default function ParticipateProjects() {
    const { projects } = useContext(ParticipateProjectsContext);
    const Icon = <FiUsers />;
  
    return (
      <>
        {projects && projects?.length > 0 && (
          <AllProjects participate={'participate/'} projectsList={projects} title={"Participate Projects"} icon={Icon} />
        )}
      </>
    );
  }