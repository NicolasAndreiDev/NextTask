'use client';
import Task from '../Task';
import styles from './Card.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import NewTask from './NewTask';
import { useState } from 'react';

export default function Card({ numTasks }: { numTasks: number }) {
  const [newTask, setNewTask] = useState(false);
  const tasks = [];

  for (let i = 0; i < numTasks; i++) {
    tasks.push(<Task key={i} />);
  }

  function handleClick() {
    setNewTask(prev => !prev)
  }

  return (
    <div className={styles.card}>
      <div className={styles.infoCard}>
        <h2 className={styles.titleCard}>To do</h2>
        <HiOutlineEllipsisHorizontal className={styles.options} />
      </div>
      <div className={styles.tasks}>{tasks}</div>
      {newTask && <NewTask />}
      {newTask ?
        <div className={styles.buttons}>
          <button className={styles.adicionarTarefaTrue}>Add task</button>
          <MdClose className={styles.closeIcon} onClick={handleClick} />
        </div> : <button className={styles.adicionarTask} onClick={handleClick}>
          <IoMdAdd className={styles.icon} />
          <span className={styles.text}>
            Add a new task</span>
        </button>
      }
    </div>
  );
}
