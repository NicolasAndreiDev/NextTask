import styles from './ProjectsPadrao.module.scss';
import { FiStar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_FAV_PROJECTS } from '@/graphql/projects/UpdateFavProject';
import { UserContext } from '@/providers/UserProvider';

type ProjectPadraoProps = {
    onClick: () => void,
    projectsList?: Array<{
        id: string,
        userId: string,
        titleProject: string,
        colorProject: string
    }>,
    text: string
}

export default function ProjectsPadrao({ onClick, projectsList, text }: ProjectPadraoProps) {
    const route = useRouter();
    const { updateUserInfo, user } = useContext(UserContext);
    const [star, setStar] = useState(false);
    const [updateFavProjects, { loading, error }] = useMutation(UPDATE_FAV_PROJECTS);

    function handleNavigation(value: string) {
        route.push(`/projects/${value}`)
    }

    function handleClick(userId: string, projectId: string) {
        setStar(prev => !prev)
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

    return (
        <div className={styles.projects} style={projectsList && projectsList?.length > 0 ? {} : { display: 'grid', placeItems: 'center' }}>
            {projectsList && projectsList?.length > 0 ? projectsList?.map((project) => {
                return (
                    <>
                        <div className={styles.project} key={project.id}>
                            <div className={styles.background} onClick={() => { handleNavigation(project.id), onClick() }}></div>
                            <div className={styles.fundoProject} style={{ background: project.colorProject }} onClick={() => { handleNavigation(project.id), onClick() }}></div>
                            <div className={styles.projectInfo} onClick={() => { handleNavigation(project.id), onClick() }}>
                                <span className={styles.title}>{project.titleProject}</span>
                                <span className={styles.info}>Area de trabalho do projeto</span>
                            </div>
                            {user?.favProjects?.some((favProject) => favProject.projectId === project.id) && <FiStar className={styles.star} onClick={() => handleClick(project.userId, project.id)} style={star ? { color: 'rgb(180, 180, 180)', fill: 'transparent' } : {}} />}
                        </div>
                    </>
                )
            })
                :
                <span className={styles.text}>{text}</span>}
        </div>
    )
}