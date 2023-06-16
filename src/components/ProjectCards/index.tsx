import styles from './ProjectCard.module.scss';
import Card from "./Card";

export default function ProjectCards() {
    return(
        <div className={styles.projectCards}>
            <Card hg='50rem'/>
            <Card hg='80rem'/>
        </div>
    )
}