'use client';
import { useEffect, useRef, useState } from 'react';
import FinishedProjects from './FinishedProjects';
import styles from './InfoHome.module.scss';
import MyProjects from './MyProjects';
import ParticipateProjects from './ParticipateProject';
import RecentProject from './RecentProject';
import FinishedProjectsPopUp from './FinishedProjects/FinishedProjectsPopUp';
import Foco from '../Foco';

export default function InfoHome() {
    const [finishedProjects, setFinishedProjects] = useState(false);
    const PopUpRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
            setFinishedProjects(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [PopUpRef]);


    function handleClick() {
        setFinishedProjects(prev => !prev)
    }

    return (
        <div className={styles.home}>
            <RecentProject />
            <MyProjects />
            <ParticipateProjects />
            <FinishedProjects onClick={handleClick} />
            {finishedProjects && <div ref={PopUpRef} style={{position: 'absolute'}}><FinishedProjectsPopUp /></div>}
            {finishedProjects && <Foco color={'rgba(0, 0, 0, 0.4)'}/>}
        </div>
    )
}