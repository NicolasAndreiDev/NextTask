import Foco from '@/components/Foco';
import ProjectsRecents from '../ProjectsType/ProjectsRecents';
import styles from './OptionsHeader.module.scss';
import { useEffect, useRef, useState } from 'react';
import ProjectsStar from '../ProjectsType/ProjectsStar';

type ProjectsProps = {
    projectsFav?: boolean, 
    projectsRecents?: boolean
}

export default function OptionsHeader({ onClick }: { onClick: () => void }) {
    const [projects, setProjects] = useState<ProjectsProps>({
        projectsFav: false,
        projectsRecents: false
    });
    const PopUpRef = useRef<{
        favProjects: HTMLDivElement | null,
        recentProjects: HTMLDivElement | null
    }>({
        favProjects: null,
        recentProjects: null
    })

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (PopUpRef.current && PopUpRef.current.favProjects && !PopUpRef.current.favProjects.contains(event.target as Element)) {
                setProjects({ projectsFav: false })
            };
            if (PopUpRef.current && PopUpRef.current.recentProjects && !PopUpRef.current.recentProjects.contains(event.target as Element)) {
                setProjects({ projectsRecents: false })
            };
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [PopUpRef])

    function handleClickProjects(name: keyof ProjectsProps) {
        setProjects((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    return (
        <div className={styles.options}>
            <div className={styles.typeProject}>
                <div className={styles.projects} onClick={() => handleClickProjects('projectsRecents')}>
                    <span>recentes</span>
                </div>
                {projects.projectsRecents && <div ref={(ref) => PopUpRef.current.recentProjects = ref}><ProjectsRecents onClick={() => handleClickProjects('projectsRecents')} /></div>}
                {projects.projectsRecents && <Foco />}
            </div>
            <div className={styles.typeProject}>
                <div className={styles.projects} onClick={() => handleClickProjects('projectsFav')}>
                    <span>Marcado com estrela</span>
                </div>
                {projects.projectsFav && <div ref={(ref) => PopUpRef.current.favProjects = ref}><ProjectsStar onClick={() => handleClickProjects('projectsFav')} /></div>}
                {projects.projectsFav && <Foco />}
            </div>
            <button className={styles.createProject} onClick={onClick}>Criar</button>
        </div>
    )
}