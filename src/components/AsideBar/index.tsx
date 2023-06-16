import styles from './asideBar.module.scss';

export default function AsideBar() {
    return(
        <div className={styles.aside}>
            <div>
                <button>Create New Project</button>
            </div>
        </div>
    )
}