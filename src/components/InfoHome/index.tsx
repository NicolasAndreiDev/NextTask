'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './InfoHome.module.scss';
import MyProjects from './MyProjects';
import ParticipateProjects from './ParticipateProject';
import RecentProject from './RecentProject';
import FinishedProjectsPopUp from './FinishedProjectsPopUp';
import Foco from '../Foco';
import FavProjects from './FavProjects';

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
      <FavProjects />
      <RecentProject />
      <MyProjects />
      <ParticipateProjects />
      <button className={styles.buttonFinish} onClick={handleClick}>View Completed Projects</button>
      {finishedProjects && <div ref={PopUpRef} style={{ position: 'absolute' }}><FinishedProjectsPopUp onClick={handleClick} /></div>}
      {finishedProjects && <Foco color={'rgba(0, 0, 0, 0.4)'} />}
    </div>
  )
}