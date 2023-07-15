import { UserContext } from '@/providers/UserProvider';
import styles from './FineshedProjectsPopUp.module.scss';
import PopUp from "@/components/PopUp";
import { useContext, useState } from 'react';
import { AiOutlineProject } from 'react-icons/ai';
import { MdClose } from "react-icons/md";
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '@/graphql/projects/DeleteProject';

export default function FinishedProjectsPopUp({ onClick }: { onClick: () => void }) {
    const { user, updateUserInfo } = useContext(UserContext);
    const finishedProjects = user?.projects?.filter((project) => project.finishedProject === true);
    const [deleteProject, {loading, error}] = useMutation(DELETE_PROJECT)

    function handleDelete(projectId: string) {
        deleteProject({
            variables: {
                userId: user?.id,
                projectId: projectId
            }
        })
        .then(() => {
            updateUserInfo()
            onClick()
        })
    }

    return (
        <PopUp>
            <div className={styles.top}>
                <div className={styles.fullTitle}>
                    <AiOutlineProject className={styles.iconProject} />
                    <h2 className={styles.title}>Finished Projects</h2>
                </div>
                <MdClose className={styles.icon} onClick={onClick} />
            </div>
            {finishedProjects && finishedProjects.length > 0 ?
                finishedProjects.map((project) => {
                    return (
                        <div className={styles.project} key={project.id}>
                            <div className={styles.info}>
                                <span className={styles.nameProject}>{project.titleProject}</span>
                                <div className={styles.del} onClick={() => handleDelete(project.id)}>
                                    <MdClose className={styles.iconDel} />
                                    <span className={styles.textDel}>Excluir</span>
                                </div>
                            </div>
                            <div className={styles.linha}></div>
                        </div>
                    );
                })
                :
                <div className={styles.projects}>
                    <span className={styles.text}>Nenhum projeto foi finalizado</span>
                </div>
            }
        </PopUp>
    );
}
