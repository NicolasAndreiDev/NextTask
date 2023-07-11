'use client';
import ProjectCards from "@/components/ProjectCards"
import { UserContext } from "@/providers/UserProvider"
import { useContext } from "react"

interface ProjectProps {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: ProjectProps) {
    return {
        title: `${params.id}`
    }
}

export default function Project({ params }: ProjectProps) {
    const { user } = useContext(UserContext);
    const project = user?.projects?.find((project) => project.titleProject === params.id)

    return (
        <>
            {project && <ProjectCards participantes={project.participantes} color={project.colorProject} projectName={params.id} />}
        </>
    )
}