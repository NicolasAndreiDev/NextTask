import { useContext } from 'react';
import ProjectsPadrao from '../ProjectsPadrao';
import { UserContext } from '@/providers/UserProvider';

export default function ProjectsRecents({onClick}: {onClick: () => void}) {
    const { user } = useContext(UserContext);
    const fourHoursAgo = new Date();
    fourHoursAgo.setHours(fourHoursAgo.getHours() - 4);
    const projectsRecents = user?.projects?.filter((project) => {
        const dataAcesso = new Date(project.dataAcesso);
        return dataAcesso >= fourHoursAgo;
    });
    const newList = projectsRecents?.filter((project) => project.finishedProject != true)

    return(
        <ProjectsPadrao onClick={onClick} text={'Projetos recentes aparecerão aqui'} projectsList={newList} />
    )
}