import styles from './FinishedProjects.module.scss';

export default function FinishedProjects({onClick}: {onClick: () => void}) {
    return(
        <button className={styles.buttonFinish} onClick={onClick}>View Completed Projects</button>
    )
}