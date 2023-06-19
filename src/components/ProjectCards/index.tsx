import styles from './ProjectCard.module.scss';
import Card from "./Card";
import OptionsProject from './OptionsProject';
import AdicionarNovaLista from './AdicionarNovaLista';

export default function ProjectCards() {
    return (
        <div className={styles.project}>
            <OptionsProject foto='' />
            <div className={styles.projectCards}>
                <Card numTasks={3} />
                <Card numTasks={6} />
                <Card numTasks={3} />
                <Card numTasks={10} />
                <Card numTasks={3} />
                <Card numTasks={10} />
                <AdicionarNovaLista />
            </div>
        </div>
    )
}