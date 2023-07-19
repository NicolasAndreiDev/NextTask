import { useContext } from 'react';
import ProjectsPadrao from '../ProjectsPadrao';
import { UserContext } from '@/providers/UserProvider';

export default function ProjectsStar({ onClick }: { onClick: () => void }) {
    const { user } = useContext(UserContext);
    const projects = user?.projects?.filter((project) =>
        user.favProjects?.some((favProject) => favProject.projectId === project.id)
    );

    return (
        <ProjectsPadrao onClick={onClick} text={'Projetos marcados com estrela aparecerão aqui'} projectsList={projects} />
    )
}