import ProjectCards from "@/components/ProjectCards"
import AdicionarNovaLista from "@/components/ProjectCards/AdicionarNovaLista"

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
    return(
        <ProjectCards />
    )
}