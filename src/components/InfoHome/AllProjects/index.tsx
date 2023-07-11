"use client";
import { useContext, useState } from 'react';
import styles from './AllProjects.module.scss';
import { FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/providers/UserProvider';

interface AllProjectsProps {
    title: string,
    icon?: JSX.Element,
    children?: React.ReactNode
}

export default function AllProjects({ title, children, icon }: AllProjectsProps) {
    const { user } = useContext(UserContext);
    const route = useRouter();
    const [star, setStar] = useState<{ active: boolean, favorite: boolean,projectId: string }>({
        active: false,
        favorite: false,
        projectId: ""
    });

    function handleMouse(projectId: string) {
        if (star.favorite && star.projectId === projectId) {
            return
        }
        setStar((prev) => ({ ...prev, active: !prev.active, projectId: projectId }));
    }

    function handleClick() {
        setStar((prev) => ({...prev, favorite: !prev.favorite}));
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
                {user?.projects?.map((project) => {
                    return (
                        <div key={`${project.id}-${title}`} className={styles.card} onMouseEnter={() => handleMouse(project.id)} onMouseLeave={() => handleMouse(project.id)}>
                            <div className={styles.background} style={{ background: project.colorProject }} onClick={() => handleNavigation(project.titleProject)}></div>
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

