import { useContext } from 'react';
import ProjectsPadrao from '../ProjectsPadrao';
import { UserContext } from '@/providers/UserProvider';

export default function ProjectsStar({onClick}: {onClick: () => void}) {
    const { user } = useContext(UserContext);

    return(
        <ProjectsPadrao onClick={onClick} text={'Projetos marcados com estrela aparecerão aqui'} projectsList={user?.projects}/>
    )
}