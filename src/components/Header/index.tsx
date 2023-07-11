'use client';
import Image from 'next/image';
import UserInfo from '../UserInfo';
import styles from './header.module.scss';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CreateProjectPopUp from '../CreateProjectPopUp';
import Foco from '../Foco';
import ProjectsStar from './ProjectsType/ProjectsStar';
import ProjectsRecents from './ProjectsType/ProjectsRecents';

interface ProjectsProps {
    projectsFav?: boolean,
    projectsRecents?: boolean
}

export default function Header() {
    const [popUp, setPopUp] = useState(false);
    const [projects, setProjects] = useState<ProjectsProps>({
        projectsFav: false,
        projectsRecents: false
    });
    const PopUpRef = useRef<{
        createProject: HTMLDivElement | null,
        favProjects: HTMLDivElement | null,
        recentsProjects: HTMLDivElement | null,
    }>({
        createProject: null,
        favProjects: null,
        recentsProjects: null
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (PopUpRef.current.createProject && !PopUpRef.current.createProject.contains(event.target as Element)) {
                setPopUp(false);
            }
            if (PopUpRef.current.favProjects && !PopUpRef.current.favProjects.contains(event.target as Element)) {
                setProjects({projectsFav: false});
            }
            if (PopUpRef.current.recentsProjects && !PopUpRef.current.recentsProjects.contains(event.target as Element)) {
                setProjects({projectsRecents: false});
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [PopUpRef])

    function handleClick() {
        setPopUp(prev => !prev)
    }

    function handleClickProjects(name: keyof ProjectsProps) {
        setProjects((prev) => ({...prev, [name]: !prev[name]}))
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.esquerda}>
                    <Link href={'/'} className={styles.logo}>
                        <Image src={"/assets/LogoRoxa.png"} alt={"NextTask"} height={32} width={32} />
                        <h1 className={styles.title}>NextTask</h1>
                    </Link>
                    <div className={styles.optionsHeaderMobile}>
                        <span>Mais</span>
                    </div>
                    <div className={styles.typeProject}>
                        <div className={styles.projects} onClick={() => handleClickProjects('projectsRecents')}>
                            <span>recentes</span>
                        </div>
                        {projects.projectsRecents && <div  ref={(ref) => PopUpRef.current.recentsProjects = ref}><ProjectsRecents onClick={() => handleClickProjects('projectsRecents')}/></div>}
                        {projects.projectsRecents && <Foco />}
                    </div>
                    <div className={styles.typeProject}>
                        <div className={styles.projects} onClick={() => handleClickProjects('projectsFav')} style={projects.projectsFav ? { backgroundColor: 'rgba(220,220,220, 0.6)' } : {}}>
                            <span>Marcado com estrela</span>
                        </div>
                        {projects.projectsFav && <div ref={(ref) => PopUpRef.current.favProjects = ref}><ProjectsStar onClick={() => handleClickProjects('projectsFav')} /></div>}
                        {projects.projectsFav && <Foco />}
                    </div>
                    <button className={styles.createProject} onClick={handleClick}>Criar</button>
                </div>
                <UserInfo />
            </header>
            {popUp && <div ref={(ref) => PopUpRef.current.createProject = ref} style={{ position: "absolute" }}><CreateProjectPopUp onClick={handleClick} /></div>}
            {popUp && <Foco color={"rgba(0,0,0, 0.4)"} />}
        </>
    )
}