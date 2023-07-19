import { GET_PARTICIPATE_PROJECTS } from "@/graphql/projects/GetParticipateProjects";
import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";

type ProjectProps = [{
    titleProject: string,
    id: string,
    userId: string,
    dataAcesso: Date,
    colorProject: string,
    participantes: string[],
    finishedProject: boolean,
    cardTasks: [{
        id: string,
        titleCard: string,
        tasks: [{
            id: string,
            titleTask: string,
            infoTask: string,
            finishedTask: boolean
        }]
    }]
}];

interface Props {
    projects: ProjectProps | null
}

export const ParticipateProjectsContext = createContext<Props>({
    projects: null
})

export const ParticipateProjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState<ProjectProps | null>(null)
    const { user } = useContext(UserContext);
    const { loading: loadingData, error: errorData, data: userData } = useQuery(GET_PARTICIPATE_PROJECTS, {
        variables: {
            userId: user?.id,
        },
    });

    useEffect(() => {
        if (userData && userData.getParticipateProjects) {
            setProjects(userData.getParticipateProjects)
        }
    }, [userData, userData?.getParticipateProjects])

    return (
        <ParticipateProjectsContext.Provider value={{ projects }}>
            {children}
        </ParticipateProjectsContext.Provider>
    )
}