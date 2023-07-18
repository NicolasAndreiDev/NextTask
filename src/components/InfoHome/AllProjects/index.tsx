"use client";
import { useState } from 'react';
import styles from './AllProjects.module.scss';
import { FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { UPDATE_FAV_PROJECTS } from '@/graphql/projects/UpdateFavProject';

interface Project {
    id: string;
    titleProject: string;
    colorProject: string;
}

interface AllProjectsProps {
    title: string,
    icon?: JSX.Element,
    children?: React.ReactNode
    projectsList?: Project[]
}

export default function AllProjects({ projectsList, title, children, icon }: AllProjectsProps) {
    const route = useRouter();
    const [star, setStar] = useState<{ active: boolean, favorite: boolean, projectId: string }>({
        active: false,
        favorite: false,
        projectId: ""
    });
    const [updateFavProjects, { loading, error }] = useMutation(UPDATE_FAV_PROJECTS);

    function handleMouse(projectId: string) {
        if (star.favorite === true && star.projectId === projectId) {
            return
        }
        setStar((prev) => ({ ...prev, active: !prev.active, projectId: projectId }));
    }

    function handleClick() {
        setStar((prev) => ({ ...prev, favorite: !prev.favorite }));
    }

    function handleNavigation(routeName: string) {
        route.push(`/projects/${routeName}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {icon}
                <span>{title}</span>
            </div>
            <div className={styles.project}>
                {projectsList?.map((project) => {
                    return (
                        <div key={`${project.id}-${title}`} className={styles.card} onMouseEnter={() => handleMouse(project.id)} onMouseLeave={() => handleMouse(project.id)}>
                            <div className={styles.background} style={{ background: project.colorProject }} onClick={() => handleNavigation(project.id)}></div>
                            <div className={styles.infoCard}>
                                <h2 className={styles.nameProject}>{project.titleProject}</h2>
                                <FiStar className={styles.star} onClick={handleClick} style={star.favorite ? (star.active && star.projectId === project.id ? { transform: 'translateX(0)', fill: 'gold', color: 'gold' } : {}) : (star.active && star.projectId === project.id ? { transform: 'translateX(0)' } : {})} />
                            </div>
                        </div>
                    )
                })}
                {children}
            </div>
        </div>
    )
}

