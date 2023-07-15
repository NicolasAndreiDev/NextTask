'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Task.module.scss';
import TaskPopUp from './TaskPopUp';
import Foco from '@/components/Foco';
import { BsCheck } from 'react-icons/bs';

type TaskProps = {
  userId: string,
  projectId: string,
  cardId: string,
  taskId: string,
  taskFinish: boolean,
  titleTask: string,
  describeText: string
}

export default function Task({ taskFinish, titleTask, describeText, userId, projectId, cardId, taskId }: TaskProps) {
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
      <div className={styles.task} onClick={handleClick} style={ taskFinish ? {backgroundColor: 'rgba(89, 202, 89, 0.39)'} : {}}>
        <span className={styles.titleTask}>{titleTask}</span>
        { taskFinish && <BsCheck className={styles.icon}/> }
      </div>
      {popUp && <div style={{ position: 'absolute' }} ref={PopUpRef}> <TaskPopUp finish={taskFinish} cardId={cardId} projectId={projectId} taskId={taskId} userId={userId} describeText={describeText} titleTask={titleTask} onClick={handleClick} /> </div>}
      {popUp && <Foco color={"rgba(0,0,0, 0.4)"} />}
    </>
  )
}