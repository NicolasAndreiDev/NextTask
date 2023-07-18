import { useContext, useState } from 'react';
import styles from './ProjectsPadrao.module.scss';
import { FiStar } from 'react-icons/fi';
import { ColorOptions } from '@/components/ColorOptions';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/providers/UserProvider';

export default function ProjectsPadrao({ onClick, projectsList, text }: { onClick: () => void, projectsList?: Array<{ id: string, titleProject: string, colorProject: string }>, text: string }) {
    const route = useRouter();
    const { user } = useContext(UserContext);


    function handleNavigation(value: string) {
        route.push(`/projects/${value}`)
    }

    return (
        <div className={styles.projects} style={projectsList && projectsList?.length > 0 ? {} : { display: 'grid', placeItems: 'center' }}>
            {projectsList && projectsList?.length > 0 ? projectsList?.map((project) => {
                return (
                    <>
                        <div className={styles.project} key={project.id} onClick={() => { onClick(), handleNavigation(project.id) }}>
                            <div className={styles.fundoProject} style={{ background: project.colorProject }}></div>
                            <div className={styles.projectInfo}>
                                <span className={styles.title}>{project.titleProject}</span>
                                <span className={styles.info}>Area de trabalho do projeto</span>
                            </div>
                            <FiStar className={styles.star} />
                        </div>
                    </>
                )
            })
                :
                <span className={styles.text}>{text}</span>}
        </div>
    )
}