import styles from './PopUp.module.scss';

export default function PopUp({children}: {children: React.ReactNode}) {
    return(
        <div className={styles.popUp}>
            {children}
        </div>
    )
}