import ProjectsPadrao from '../ProjectsPadrao';

export default function ProjectsRecents({onClick}: {onClick: () => void}) {
    return(
        <ProjectsPadrao onClick={onClick}/>
    )
}