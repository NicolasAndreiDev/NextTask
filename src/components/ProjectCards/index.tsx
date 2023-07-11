import styles from './ProjectCard.module.scss';
import Card from "./Card";
import OptionsProject from './OptionsProject';
import AdicionarNovaLista from './AdicionarNovaLista';

interface ProjectCardsProps {
    color: string,
    projectName: string,
    participantes: string[],
}

export default function ProjectCards({color, projectName, participantes}: ProjectCardsProps) {
    return (
        <div className={styles.background} style={{background: color}}>
            <div className={styles.project} >
                <OptionsProject foto='' titleProject={projectName} participantes={participantes}/>
                <div className={styles.projectCards}>
                    <Card numTasks={3} />
                    <Card numTasks={6} />
                    <Card numTasks={3} />
                    <Card numTasks={10} />
                    <Card numTasks={3} />
                    <Card numTasks={12} />
                    <AdicionarNovaLista />
                </div>
            </div>
        </div>
    )
}