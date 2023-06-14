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
        <p>{params.id}</p>
    )
}