import styles from './ProjectCard.module.scss';
import Card from "./Card";
import OptionsProject from './OptionsProject';
import AdicionarNovoCard from './AdicionarNovoCard';
import { useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';

interface ProjectCardsProps {
    color: string,
    projectId: string,
    participantes:  [{
        id: string,
        username: string, 
        email: string, 
        bannerColor: string, 
        perfilColor: string
    }]
}

export default function ProjectCards({ color, projectId, participantes }: ProjectCardsProps) {
    const { user } = useContext(UserContext);
    const project = user?.projects?.find(project => project.id === projectId)
    const cards = project?.cardTasks.length
    const allCards: number[] = []

    if (cards) {
        for (let i = 1; i < cards + 1; i++) {
            allCards.push(i);
        }
    }

    return (
        <div className={styles.background} style={{ background: color }}>
            <div className={styles.project} >
                {project && <OptionsProject titleProject={project.titleProject} participantes={participantes} projectId={project.id}/>}
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