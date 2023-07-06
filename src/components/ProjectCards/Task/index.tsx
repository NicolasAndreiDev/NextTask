'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Task.module.scss';
import TaskPopUp from './TaskPopUp';
import Foco from '@/components/Foco';

export default function Task() {
  const [popUp, setPopUp] = useState(false);
  const PopUpRef = useRef<HTMLDivElement>(null)

  function handleClick() {
    setPopUp(prev => !prev)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (PopUpRef.current && !PopUpRef.current.contains(event.target as Element)) {
        setPopUp(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [PopUpRef]);

  return (
    <>
      <div className={styles.task} onClick={handleClick}>
        <span className={styles.titleTask}>a</span>
      </div>
      {popUp && <div style={{ position: 'absolute' }} ref={PopUpRef}> <TaskPopUp onClick={handleClick}/> </div>}
      {popUp && <Foco color={"rgba(0,0,0, 0.4)"} />}
    </>
  )
}