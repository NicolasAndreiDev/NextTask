import styles from './ProjectCard.module.scss';
import Card from "./Card";
import OptionsProject from './OptionsProject';
import AdicionarNovoCard from './AdicionarNovoCard';
import { useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';
import { ParticipateProjectsContext } from '@/providers/ParticipateProjectsProvider';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '@/graphql/user/GetUserById';

interface ProjectCardsProps {
    color: string,
    projectId: string,
    participate: boolean,
    participantes:  [{
        id: string,
        username: string, 
        email: string, 
        bannerColor: string, 
        perfilColor: string
    }]
}

export default function ProjectCards({ color, participate, projectId, participantes }: ProjectCardsProps) {
    const { projects } = useContext(ParticipateProjectsContext);
    const { user } = useContext(UserContext);
    const project = participate ? projects?.find(project => project.id === projectId) : user?.projects?.find(project => project.id === projectId);
    const cards = project?.cardTasks.length
    const allCards: number[] = []
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: {
            userId: project?.userId
        }
    })

    if (cards) {
        for (let i = 1; i < cards + 1; i++) {
            allCards.push(i);
        }
    }

    return (
        <div className={styles.background} style={{ background: color }}>
            <div className={styles.project} >
                {project && data && <OptionsProject participantesNoAccount={project.participantes} userId={project.userId} username={data.getUserById.username} titleProject={project.titleProject} participantes={participantes} projectId={project.id}/>}
                <div className={styles.projectCards}>
                    {project?.cardTasks?.map((card, index) => {
                        return (
                            <Card position={index} key={card.id} optionValue={allCards} task={card.tasks} titleCard={card.titleCard} cardId={card.id} projectId={project.id} userId={project.userId} />
                        )
                    })}
                    {project && <AdicionarNovoCard projectId={project.id} userId={project.userId} />}
                </div>
            </div>
        </div>
    )
}