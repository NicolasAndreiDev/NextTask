'use client';
import Task from '../Task';
import styles from './Card.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import NewTask from './NewTask';
import { useEffect, useRef, useState } from 'react';
import ConfigCard from './ConfigCard';

interface OptionsProps {
  newTask: boolean,
  optionsCard: boolean
}

export default function Card({ numTasks }: { numTasks: number }) {
  const [options, setOptions] = useState<OptionsProps>({
    newTask: false,
    optionsCard: false
  });
  const [value, setValue] = useState("To do");
  const tasks = [];

  for (let i = 0; i < numTasks; i++) {
    tasks.push(<Task key={i} />);
  }

  function handleClick(name: keyof OptionsProps) {
    setOptions((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setValue(event.target.value);
  }

  return (
    <div className={styles.card}>
      <div className={styles.infoCard}>
        <textarea className={styles.titleCard} value={value} onChange={handleChange} rows={1} spellCheck={false} />
        <div className={styles.configLayout}>
          <HiOutlineEllipsisHorizontal className={styles.options} onClick={() => handleClick('optionsCard')} />
          {options.optionsCard && <ConfigCard close={() => handleClick('optionsCard')} onClick={() => {handleClick('newTask'), handleClick('optionsCard')}}/>}
        </div>
      </div>
      <div className={styles.tasks}>{tasks}</div>
      {options.newTask && <NewTask />}
      {options.newTask ?
        <div className={styles.buttons}>
          <button className={styles.adicionarTarefaTrue}>Add task</button>
          <MdClose className={styles.closeIcon} onClick={() => handleClick('newTask')} />
        </div> : <button className={styles.adicionarTask} onClick={() => handleClick('newTask')}>
          <IoMdAdd className={styles.icon} />
          <span className={styles.text}>Add a new task</span>
        </button>
      }
    </div>
  );
}
