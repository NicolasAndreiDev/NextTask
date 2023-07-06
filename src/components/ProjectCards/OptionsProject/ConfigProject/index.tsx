import styles from './Config.module.scss';

export default function ConfigProject() {
    return(
        <div className={styles.config}>
            <span className={styles.text}>Finished Project</span>
            <span className={styles.text}>Leave the project</span>
        </div>
    )
}