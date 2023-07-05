import styles from './FineshedProjectsPopUp.module.scss';
import PopUp from "@/components/PopUp";
import { useState } from 'react';
import { AiOutlineProject } from 'react-icons/ai';
import { MdClose } from "react-icons/md";

export default function FinishedProjectsPopUp({ onClick }: { onClick: () => void }) {
    const [projects, setProjects] = useState(false);

    return (
        <PopUp>
            <div className={styles.top}>
                <div className={styles.fullTitle}>
                    <AiOutlineProject className={styles.iconProject} />
                    <h2 className={styles.title}>Finished Projects</h2>
                </div>
                <MdClose className={styles.icon} onClick={onClick} />
            </div>
            {!projects ?
                <div className={styles.project}>
                    <div className={styles.info}>
                        <span className={styles.nameProject}>Novo-Projeto</span>
                        <div className={styles.del}>
                            <MdClose className={styles.iconDel} />
                            <span className={styles.textDel}>Excluir</span>
                        </div>
                    </div>
                    <div className={styles.linha}></div>
                </div>
                :
                <div className={styles.projects}>
                    <span className={styles.text}>Nenhum projeto foi finalizado</span>
                </div>
            }
        </PopUp>
    )
}