'use client';
import ProjectCards from "@/components/ProjectCards"
import { GET_ALL_USERS } from "@/graphql/user/GetAllUsers";
import { UserContext } from "@/providers/UserProvider"
import { useQuery } from "@apollo/client";
import { useContext } from "react"

interface ProjectProps {
    params: {
        id: string
    }
}

export default function Project({ params }: ProjectProps) {
    const { user } = useContext(UserContext);
    const project = user?.projects?.find((project) => project.id === params.id);
    const {loading: loadingData, error: errorData, data: userData} = useQuery(GET_ALL_USERS, {
        variables: {
            users: project?.participantes
        }
    });

    return (
        <>
            {project && userData && <ProjectCards participate={false} participantes={userData.getUsersByEmail} color={project.colorProject} projectId={project.id} />}
        </>
    )
}