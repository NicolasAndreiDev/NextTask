'use client';
import ProjectCards from "@/components/ProjectCards";
import { GET_ALL_USERS } from "@/graphql/user/GetAllUsers";
import { ParticipateProjectsContext } from "@/providers/ParticipateProjectsProvider";
import { useQuery } from "@apollo/client";
import { useContext } from "react";

interface ProjectProps {
    params: {
        id: string
    }
}

export default function ProjectParticipate({ params }: ProjectProps) {
    const { projects } = useContext(ParticipateProjectsContext);
    const project = projects?.find((project) => project.id === params.id);
    const { loading: loadingData, error: errorData, data: userData } = useQuery(GET_ALL_USERS, {
        variables: {
            users: project?.participantes
        }
    });

    return (
        <>
            {project && userData && <ProjectCards participate={true} color={project.colorProject} participantes={userData.getUsersByEmail} projectId={project.id} />}
        </>
    )
}