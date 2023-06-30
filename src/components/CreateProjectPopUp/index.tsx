import PopUp from "@/components/PopUp";
import styles from './CreateProject.module.scss';

export default function CreateProjectPopUp() {
    return(
        <PopUp>
            <h2>Create Project</h2>
            <div className={styles.visuProject}></div>
            <h2>Project title</h2>
            <textarea />
            <h2>Background</h2>
            <div className={styles.fundoQuadros}>
                <div className={styles.quadro}></div>
            </div>
        </PopUp>
    )
}