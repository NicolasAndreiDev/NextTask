"use client";
import { useContext, useEffect, useState } from 'react';
import styles from './AllProjects.module.scss';
import { FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { UPDATE_FAV_PROJECTS } from '@/graphql/projects/UpdateFavProject';
import { UserContext } from '@/providers/UserProvider';

interface Project {
    id: string;
    userId: string;
    titleProject: string;
    colorProject: string;
}

interface AllProjectsProps {
    title: string,
    icon?: JSX.Element,
    participate: string,
    children?: React.ReactNode
    projectsList?: Project[]
}

export default function AllProjects({ participate, projectsList, title, children, icon }: AllProjectsProps) {
    const route = useRouter();
    const { user, updateUserInfo } = useContext(UserContext);
    const [star, setStar] = useState<{ active: boolean, favorite: boolean, projectId: string }[]>([]);
    const [updateFavProjects, { loading, error }] = useMutation(UPDATE_FAV_PROJECTS);

    useEffect(() => {
        if (projectsList) {
            const initialStars = projectsList.map((project) => ({
                active: user && user.favProjects ? user.favProjects.some((favProject) => favProject.projectId === project.id) : false,
                favorite: user && user.favProjects ? user.favProjects.some((favProject) => favProject.projectId === project.id) : false,
                projectId: project.id
            }));
            setStar(initialStars);
        }
    }, [projectsList, user]);

    function handleMouse(projectId: string, entered: boolean) {
        const updatedStars = star.map((star) => {
          if (star.favorite === true && star.projectId === projectId) {
            return star;
          }
          return { ...star, active: star.projectId === projectId ? entered : star.active };
        });
        setStar(updatedStars);
      }

    function handleClick(index: number, userId: string, projectId: string) {
        const updatedStars = [...star];
        updatedStars[index].favorite = !updatedStars[index].favorite;
        setStar(updatedStars);
        updateFavProjects({
            variables: {
                userId,
                projectId: {
                    projectId: projectId
                }
            }
        }).then(() => {
            updateUserInfo()
        })
    }

    function handleNavigation(routeName: string) {
        route.push(`/projects/${participate}${routeName}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {icon}
                <span>{title}</span>
            </div>
            <div className={styles.project}>
                {projectsList?.map((project, index) => {
                    return (
                        <div key={`${project.id}-${title}`} className={styles.card} onMouseEnter={() => handleMouse(project.id, true)} onMouseLeave={() => handleMouse(project.id, false)}>
                            <div className={styles.background} style={{ background: project.colorProject }} onClick={() => handleNavigation(project.id)}></div>
                            <div className={styles.infoCard}>
                                <h2 className={styles.nameProject}>{project.titleProject}</h2>
                                <FiStar className={styles.star} onClick={() => handleClick(index, project.userId, project.id)} style={star[index]?.favorite ? (star[index].active ? { transform: 'translateX(0)', fill: 'gold', color: 'gold' } : {}) : (star[index]?.active ? { transform: 'translateX(0)' } : {})} />
                            </div>
                        </div>
                    )
                })}
                {children}
            </div>
        </div>
    )
}

